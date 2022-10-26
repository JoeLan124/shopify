import Head from "next/head";
import prisma from "lib/prisma";
import { getProducts } from "lib/data.js";
import Image from "next/image";

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>Shop</title>
        <meta name="description" content="Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-center text-black ">
        <h1 className="mt-4 font-extrabold text-2xl">Shop</h1>
        <div className="mt-5 mx-auto max-w-sm sm:w-full sm:flex sm:flex-row">
          {products.map((product) => (
            <div
              className="flex flex-col mb-4 sm:w-full rounded-2xl p-2 bg-gradient-to-tl from-green-300 to-blue-300 shadow-lg"
              key={product.id}
            >
              <div className="text-center text-lg pb-1 font-semibold ">
                {product.title} (${product.price / 100})
              </div>
              <Image
                className="rounded-lg"
                src={"/" + `${product.image}`}
                alt={product.title}
                width={300}
                height={300}
              />
              <p className="mt-2">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await getProducts(prisma);

  return {
    props: {
      products,
    },
  };
}
