export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const dokId = searchParams.get("dokId");

  if (!dokId) {
    return Response.json(
      { error: "dokId saknas" },
      { status: 400 }
    );
  }

  const response = await fetch(
    `https://data.riksdagen.se/dokument/${dokId}.json`
  );

  const data = await response.json();

  return Response.json(data);
}