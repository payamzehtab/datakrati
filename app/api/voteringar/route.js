export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const rm = searchParams.get("rm") || "2025/26";

  const response = await fetch(
    `https://data.riksdagen.se/voteringlista/?rm=${rm}&sz=2000&utformat=json`
  );

  const data = await response.json();

  return Response.json(data);
}