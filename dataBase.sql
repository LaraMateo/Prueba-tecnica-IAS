PGDMP         )                y            reporte_servicio    13.1    13.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16394    reporte_servicio    DATABASE     t   CREATE DATABASE reporte_servicio WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
     DROP DATABASE reporte_servicio;
                postgres    false            �            1255    16416 [   addService ("char"[], "char"[], date, date, time without time zone, time without time zone) 	   PROCEDURE     a  CREATE PROCEDURE public."addService "("idServicio" "char"[], "idTecnico" "char"[], "fechaInicio" date, "fechaFin" date, "horaInicio" time without time zone, "horaFin" time without time zone)
    LANGUAGE sql
    AS $_$
INSERT INTO servicios (id_servicio, id_tecnico, fecha_inicio, hora_inicio, fecha_fin, hora_fin) 
VALUES($1, $2, $3, $5, $4, $6);
$_$;
 �   DROP PROCEDURE public."addService "("idServicio" "char"[], "idTecnico" "char"[], "fechaInicio" date, "fechaFin" date, "horaInicio" time without time zone, "horaFin" time without time zone);
       public          postgres    false            �            1259    16395 	   servicios    TABLE       CREATE TABLE public.servicios (
    id_servicio character varying(255) NOT NULL,
    id_tecnico character varying(255) NOT NULL,
    fecha_inicio date NOT NULL,
    hora_inicio time without time zone NOT NULL,
    fecha_fin date NOT NULL,
    hora_fin time without time zone NOT NULL
);
    DROP TABLE public.servicios;
       public         heap    postgres    false            �          0    16395 	   servicios 
   TABLE DATA           l   COPY public.servicios (id_servicio, id_tecnico, fecha_inicio, hora_inicio, fecha_fin, hora_fin) FROM stdin;
    public          postgres    false    200   D
       #           2606    16402    servicios servicios_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_pkey PRIMARY KEY (id_servicio);
 B   ALTER TABLE ONLY public.servicios DROP CONSTRAINT servicios_pkey;
       public            postgres    false    200            �   �  x����n�0E����$qx����i{�����RӍ��õsoҴ�"`��GF���dU|휬�_j6��4P�TށR�5^�& '�ƅ���RM#��&�A�@�i�jS�WgD�h���0�ms ���7)6�cRg���̝��d܃�L��[dVAP|�ys��)y��Y1���j(>J��x�$r��8�h
@n<Ũ)� "7��#�;8'��Wx�8�~IJ�o��|J	�ߍtS�؋�*��^C�ѹ��7T�b� ���?�"��%�
E��B�b>�ݡ�_�`O�K��q�$g we�
pϮ� �����o���0_}Cȱ(9#Xx��(r���)��2��_��c��|�~��� �=��     