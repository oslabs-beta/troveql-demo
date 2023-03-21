-- create the tables
-- default is the public schema 
-- 
-- psql -d postgres://akzvayps:qTVWKmn-i8cBzmDagJB6tvGGWs02ApGn@mahmud.db.elephantsql.com/akzvayps -f movie_create.sql
-- CREATE TABLE products ( ... ); === CREATE TABLE public.products ( ... );

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- query for public.user so not to grab current user from SQL


CREATE TABLE IF NOT EXISTS public.movies (
	"_id" serial NOT NULL,
	"movie_id" varchar NOT NULL UNIQUE,
	"original_title" varchar NOT NULL,
	"original_language" varchar NOT NULL,
	"popularity" varchar,
	"vote_count" bigint,
	CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS public.popularMovies (
	"_id" serial NOT NULL,
	"movie_id" varchar NOT NULL UNIQUE,
	CONSTRAINT "popularMovies_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS public.reviews (
	"_id" serial NOT NULL,
	"author" varchar NOT NULL,
  "content" varchar NOT NULL,
	"created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	"updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	"movie_id" varchar NOT NULL UNIQUE,
  CONSTRAINT "reviews_pk" PRIMARY KEY ("_id")
 ) WITH (
    OIDS=FALSE
);


-- to add the foreign keys at the end of the table creation
-- add foreign key to users_itineraries called "users_itineraries_fk"
-- ALTER TABLE public.boards ADD CONSTRAINT "users_itineraries_fk0" FOREIGN KEY ("user_id") REFERENCES  public.users("_id");
ALTER TABLE public.popularMovies ADD CONSTRAINT "movie_id_fk0" FOREIGN KEY ("movie_id") REFERENCES public.movies("_id");
ALTER TABLE public.reviews ADD CONSTRAINT "movie_id_fk1" FOREIGN KEY ("movie_id") REFERENCES public.movies("_id");