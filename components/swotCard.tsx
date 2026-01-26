"use client";

declare global {
  interface Window {
    Tally?: {
      openPopup: (formId: string, options?: {
        layout?: string;
        width?: number;
        autoClose?: number;
      }) => void;
    };
  }
}

export default function SWOTCard() {
  const openTallyForm = () => {
    if (window.Tally) {
      window.Tally.openPopup('zx7GDE', {
        layout: 'modal',
        width: 700,
        autoClose: 3000
      });
    }
  };

  return (
    <div className="swot-card">
      <div className="swot-left">
        <div className="swot-title-wrap">
          <span className="swot-title">SWOT form</span>
        </div>

        <div className="swot-desc-wrap">
          <p className="swot-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
        </div>
      </div>

      <div className="swot-right">
        <div className="swot-icon"></div>
        <button className="swot-btn" onClick={openTallyForm}>SWOT</button>
      </div>
    </div>
  );
}
