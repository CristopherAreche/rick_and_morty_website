const API_BASE_URL = "https://rickandmortyapi.com/api";

class RickAndMortyApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "RickAndMortyApiError";
    this.status = status;
  }
}

const createUrl = (path, query = {}) => {
  const url = new URL(`${API_BASE_URL}${path}`);

  Object.entries(query).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
};

const extractIdsFromUrls = (urls = []) =>
  urls
    .map((resourceUrl) => resourceUrl.split("/").at(-1))
    .filter(Boolean)
    .join(",");

const fetchJson = async (url, { allowNotFound = false, signal } = {}) => {
  const response = await fetch(url, { signal });
  let data = null;

  try {
    data = await response.json();
  } catch {
    if (response.ok) {
      return null;
    }
  }

  if (response.ok) {
    return data;
  }

  if (allowNotFound && response.status === 404) {
    return null;
  }

  throw new RickAndMortyApiError(
    data?.error || "Unexpected API response.",
    response.status
  );
};

export const emptyCollection = { info: {}, results: [] };
export const emptyCatalogInfo = { count: 0, pages: 0 };

const fetchCatalogInfo = async (path, { signal } = {}) => {
  const data = await fetchJson(createUrl(path), { signal });

  return data?.info ?? emptyCatalogInfo;
};

export const fetchCharacters = async ({
  page,
  name,
  status,
  gender,
  species,
  signal,
}) => {
  const data = await fetchJson(
    createUrl("/character/", { page, name, status, gender, species }),
    { allowNotFound: true, signal }
  );

  return data ?? emptyCollection;
};

export const fetchCharacter = (id, { signal } = {}) =>
  fetchJson(createUrl(`/character/${id}`), { signal });

export const fetchEpisode = (id, { signal } = {}) =>
  fetchJson(createUrl(`/episode/${id}`), { signal });

export const fetchEpisodeCatalogInfo = ({ signal } = {}) =>
  fetchCatalogInfo("/episode", { signal });

export const fetchLocation = (id, { signal } = {}) =>
  fetchJson(createUrl(`/location/${id}`), { signal });

export const fetchLocationCatalogInfo = ({ signal } = {}) =>
  fetchCatalogInfo("/location", { signal });

export const fetchCharactersByUrls = async (urls, { signal } = {}) => {
  if (!urls?.length) {
    return [];
  }

  const ids = extractIdsFromUrls(urls);

  if (!ids) {
    return [];
  }

  const data = await fetchJson(createUrl(`/character/${ids}`), {
    allowNotFound: true,
    signal,
  });

  if (!data) {
    return [];
  }

  return Array.isArray(data) ? data : [data];
};
