-- create the tables
-- default is the public schema 
-- 
-- psql -d postgres://akzvayps:qTVWKmn-i8cBzmDagJB6tvGGWs02ApGn@mahmud.db.elephantsql.com/akzvayps -f user_create.sql
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


CREATE TABLE IF NOT EXISTS public.users (
	"_id" serial NOT NULL,
	"username" varchar NOT NULL UNIQUE,
	"password" varchar NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS public.boards (
	"_id" serial NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "boards_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS public.columns (
	"_id" serial NOT NULL,
	"name" varchar NOT NULL,
  "board_id" bigint NOT NULL,
  CONSTRAINT "columns_pk" PRIMARY KEY ("_id")
 ) WITH (
    OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS public.cards (
	"_id" serial NOT NULL,
	"task" varchar NOT NULL,
	"column_id" bigint NOT NULL,
	CONSTRAINT "cards_pk" PRIMARY KEY ("_id")
) WITH (
		OIDS=FALSE
);


-- join table 
CREATE TABLE IF NOT EXISTS public.users_boards (
  "_id" serial NOT NULL,
  "user_id" bigint NOT NULL,
  "board_id" bigint NOT NULL,
  CONSTRAINT "users_boards_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

-- to add the foreign keys at the end of the table creation
-- add foreign key to users_itineraries called "users_itineraries_fk"
-- ALTER TABLE public.boards ADD CONSTRAINT "users_itineraries_fk0" FOREIGN KEY ("user_id") REFERENCES  public.users("_id");
ALTER TABLE public.users_boards ADD CONSTRAINT "user_boards_fk0" FOREIGN KEY ("user_id") REFERENCES public.users("_id");
ALTER TABLE public.users_boards ADD CONSTRAINT "user_boards_fk1" FOREIGN KEY ("board_id") REFERENCES public.boards("_id");
ALTER TABLE public.columns ADD CONSTRAINT "columns_boards_fk0" FOREIGN KEY ("board_id") REFERENCES public.boards("_id");
ALTER TABLE public.cards ADD CONSTRAINT "cards_fk0" FOREIGN KEY ("column_id") REFERENCES public.columns("_id");