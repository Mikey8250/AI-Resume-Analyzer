import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Atx from "~/Components/Atx";
import Details from "~/Components/details";
import Summary from "~/Components/summary";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Resumind | Review" },
  { name: "description", content: "Detail overview of your resume" },
];

function resume() {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [resumeUrl, setresumeUrl] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [Feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate(`/auth?/next=/resume/${id}`);
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      console.log("kv is: ", kv);
      console.log("resume is: ", resume);

      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setresumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;

      const imageUrl = URL.createObjectURL(imageBlob);
      setimageUrl(imageUrl);

      setFeedback(data.feedback);
      console.log({ resumeUrl, imageUrl, feedback: data.feedback });
    };
    loadResume();
  }, [id]);

  return (
    <main className="!pt-0">
      <nav className="resume-nav">
        <Link to={"/"} className="back-button">
          <img src="/icons/back.svg" alt="" className="w-2.5 h-2.5" />
          <span className="text-gray-800 text-sm font-semibold">
            Back to homepage
          </span>
        </Link>
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section bg-[url('/images/bg-small.svg') bg-cover h-[100vh] sticky top-0 items-center justify-center">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
              <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  alt=""
                  className="w-full h-full object-contain rounded-2xl"
                  title="resume"
                />
              </a>
            </div>
          )}
        </section>

        <section className="feedback-section">
          <h2 className="text-4xl text-black">Resume Review</h2>
          {Feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
              <Summary feedback={Feedback} />
              <Atx
                score={Feedback.ATS.score || 0}
                suggestions={Feedback.ATS.tips || []}
              />
              <Details feedback={Feedback} />
            </div>
          ) : (
            <img src="/images/resume-scan-2.gif" alt="" className="w-full" />
          )}
        </section>
      </div>
    </main>
  );
}

export default resume;
