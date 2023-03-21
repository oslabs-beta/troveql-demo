-- run following command line
-- psql -d postgres://akzvayps:qTVWKmn-i8cBzmDagJB6tvGGWs02ApGn@mahmud.db.elephantsql.com/akzvayps -f reviews.sql

INSERT INTO public.reviews (author, content, created_at, movie_id)
VALUES
-- ('Jamie', 'test', CURRENT_TIMESTAMP, '6'),
-- ('Alex', 'test1', CURRENT_TIMESTAMP, '7')
('Eric', '(As theme music begins to build in my mind...)\r\n\r\nWell, it actually has a title, what the Darth Vader theme. And that title is composed by the great John Williams, whom, as many of you may already know, also composed the theme music for  😊', CURRENT_TIMESTAMP, 5),
('Erika', '(As theme music begins to build in my mind...)\r\n\r\nWell, it actually has a title, what the Darth Vader theme. And that title is composed by the great John Williams, whom, as many of you may already know, also composed the theme music - that legendary score simply titled, long cult fan in the wake. 😊', CURRENT_TIMESTAMP, 8)