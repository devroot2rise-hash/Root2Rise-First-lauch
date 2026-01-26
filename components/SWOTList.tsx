"use client";

// SWOTList component placeholder
// Implement SWOT list UI here
export default function SWOTList({ data }: { data: any[] }) {
  if (!data.length) return <div>No SWOT entries found.</div>;
  return (
    <ul>
      {data.map(swot => (
        <li key={swot.id}>
          <strong>Strengths:</strong> {swot.strengths} <br />
          <strong>Weaknesses:</strong> {swot.weaknesses} <br />
          <strong>Opportunities:</strong> {swot.opportunities} <br />
          <strong>Threats:</strong> {swot.threats} <br />
          <em>{swot.createdAt && new Date(swot.createdAt.seconds * 1000).toLocaleString()}</em>
        </li>
      ))}
    </ul>
  );
}
