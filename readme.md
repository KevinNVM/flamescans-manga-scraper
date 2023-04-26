# FlameScans Manga Scraper API Documentation

## Introduction

Welcome to the FlameScans manga scraper API. This API allows you to retrieve information about manga series, chapters, and images from the FlameScans website. All of the query parameter will also follow the FlameScans website's style.

The base URL for this API is `http://localhost:3000`. All endpoints will be relative to this URL.

## Installation

1. First clone this repository

```
git clone https://github.com/KevinNVM/flamescans-manga-scraper.git
```

2. Install dependencies

```
npm i
```

3. Run dev server

```
npm run dev
```

## Endpoints

### `/`

Returns a JSON object containing a welcome message, API status, GitHub repository link, and creation date.

#### Request

```http
GET /
```

#### Response

```json
{
  "message": "Welcome to `FlameScans` manga scraper",
  "apiStatus": true,
  "github": "https://github.com/KevinNVM/flamescans-manga-scraper",
  "createdAt": "26/04/2023"
}
```

### `/series`

Returns a JSON object containing information about manga series from the FlameScans website.

#### Request

```http
GET /series?page=<pageNumber>&type=<type>&status=<status>
```

#### Parameters

| Parameter | Required | Description                                                                                         |
| --------- | -------- | --------------------------------------------------------------------------------------------------- |
| page      | Yes      | The page number of the series list to retrieve                                                      |
| type      | No       | The type of manga series to retrieve (e.g. `Manhwa`, `Manga`, `Manhua`, or leave empty for default) |
| status    | No       | The status of manga series to retrieve (e.g. `Ongoing`, `Completed`, or leave empty for default)    |

#### Response

```json
{
  "currentPage": pageNumber,
  "nextPage": nextPageNumber,
  "type": type,
  "status": status,
  "count": comics.length,
  "comics": comics
}
```

### `/details/:id`

Returns a JSON object containing details about a specific manga series.

#### Request

```http
GET /details/:id
```

#### Parameters

| Parameter | Required | Description                                        |
| --------- | -------- | -------------------------------------------------- |
| id        | Yes      | The ID of the manga series to retrieve details for |

#### Response

```json
{
  "title": title,
  "alternativeTitles": alternativeTitles,
  "posterSrc": posterSrc,
  "genres": genres,
  "type": type,
  "status": status,
  "author": author,
  "artist": artist,
  "serialization": serialization,
  "score": score,
  "synopsis": synopsis,
  "chaptersCount": chapters.length,
  "chapters": chapters
}
```

### `/show/:id`

Returns a JSON object containing the image URLs for a specific manga chapter.

#### Request

```http
GET /show/:id
```

#### Parameters

| Parameter | Required | Description                                        |
| --------- | -------- | -------------------------------------------------- |
| id        | Yes      | The ID of the manga chapter to retrieve images for |

#### Response

```json
{
  "id": id,
  "title": title,
  "count": imgSrcs.length,
  "imgSrcs": imgSrcs
}
```

## Error Responses

The API may return error responses with the following structure:

```json
{
  "error": "Error message"
}
```

The `error` field contains the error message. The HTTP status code of the response will indicate the type of error.

The API may return the following status codes:

- `400 Bad Request` - Invalid or missing parameters
- `404 Not Found` - Invalid endpoint or resource not found
- `500 Internal Server Error` - Server error or unexpected exception occurred.
