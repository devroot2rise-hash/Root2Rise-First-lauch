import Image from "next/image";

export default function GuidanceStack() {
  return (
    <div style={{ position: "relative", width: "100%",display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center" }} >
      <h2 className="gs-title">From Root To Rise</h2>

      <div className="gs-stack">
        {/* Back stacked cards (3) */}
        <div className="gs-layer gs-layer-1"><Image src="/guide1.png" alt="" height={800} width={600}/></div>
        <div className="gs-layer gs-layer-2"><Image src="/guide2.png" alt="" height={500} width={700}/></div>
        <div className="gs-layer gs-layer-3"><Image src="/guide3.png" alt="" height={500} width={800}/></div>
        <div className="gs-layer gs-layer-4"><Image src="/guide5.png" alt="" height={500} width={900}/></div>


        {/* Main front card */}
          {/* Transparent overlay div (as you asked) */}
      </div>

      {/* Extra image placeholders (total 4 images) */}
    </div>
  );
}