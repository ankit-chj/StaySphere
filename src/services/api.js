import propertiesUrl from "../assets/data/properties.json?url";

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(
      `Request failed with status ${response.status}`
    );
  }

  return response.json();
}

export async function getProperties() {
  const response = await fetch(propertiesUrl);
  return handleResponse(response);
}

export async function getPropertyById(propertyId) {
  const properties = await getProperties();
  const property = properties.find(
    (item) => String(item.id) === String(propertyId)
  );

  if (!property) {
    throw new Error("Property not found");
  }

  return property;
}
