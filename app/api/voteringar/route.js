export async function GET() {
  const response = await fetch(
    "https://data.riksdagen.se/voteringlista/?rm=2025/26&sz=400&utformat=json"
  );

  const data = await response.json();

  return Response.json(data);
}