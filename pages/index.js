import Head from "next/head";
import prisma from "lib/prisma";
import { getProducts } from "lib/data.js";
import Image from "next/image";
import { FLIGHT_SERVER_CSS_MANIFEST } from "next/dist/shared/lib/constants";

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

        <div className="mt-20 sm:mx-auto max-w-4xl mx-10">
          {products.map((product) => (
            <div className="mb-4 grid sm:grid-cols-2" key={product.id}>
              <div>
                <Image
                  className="rounded-2xl "
                  src={`/` + product.image}
                  width={"400"}
                  height={"400"}
                />
              </div>
              <div className="sm:ml-10 mb-20 sm:mb-0">
                <h2 className="text-3xl font-extrabold">{product.title}</h2>
                <h3 className="text-2xl font-extrabold mb-4">
                  ${product.price / 100}
                </h3>
                <p className="text-xl">{product.description}</p>
              </div>
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
