import Image from "next/image";

export default function DownloadCard() {
  return (
    <section className="download-wrap">
      <div className="download-card">
        {/* LEFT IMAGE CARD */}
        <div className="download-left">
          <div className="download-frame">
            <div className="download-inner">
              <Image
                src="/vbDownload.png"
                alt="Illustration"
                width={700}
                height={700}
                className="download-img"
              />

              <h3 className="download-caption">
                Organize Dreams <span>into Vision Board</span>
              </h3>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="download-right">
          <h2 className="download-title">Main text</h2>
          <p className="download-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </p>
          <button
  className="download-btn"
  onClick={() => {
    const link = document.createElement("a");
    link.href = "/VisionBoard.png";
    link.download = "vision-board.png";
    link.click();
  }}
>
  Download
</button>
        </div>
      </div>
    </section>
  );
}
