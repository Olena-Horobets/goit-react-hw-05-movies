import slugify from 'slugify';

export const getSlug = movie => {
  return slugify(`${movie.title || movie.name} ${movie.id}`, {
    lower: true,
    strict: true,
  });
};

export const parseSlug = slug => {
  return slug.match(/[a-zA-Z0-9]+$/)[0];
};
