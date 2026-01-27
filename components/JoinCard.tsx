import Image from "next/image";

export default function JoinCard() {
  return (
    <section className="join-card">
      {/* LEFT IMAGE */}
      <div className="join-left">
        <Image
          src="/collegeStudents2.png"
          alt="Join Illustration"
          fill
          priority
          className="join-img"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="join-right">
        <h2 className="join-heading">Join our Community</h2>
        <button className="join-btn">The Other 99% Co-Lab</button>
      </div>
    </section>
  );
}
