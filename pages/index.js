import Head from "next/head";
import Image from "next/image";
import EmailInput from "../components/Input/EmailInput";

export default function Home() {
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=7" />
        <meta
          name="description"
          content="Prod-Home aims to foster open-source project collaboration between developers to showcase their skills."
        />
        <meta name="keywords" content="prod, prod-home, open-source" />
        <title>Prod-Home | Open-source project collaboration</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <header className="relative mx-auto w-full max-w-7xl">
        <div className="px-8 pt-20 pb-0 flex items-center justify-center">
          <h1>
            <Image
              className="w-auto"
              src="/logo.svg"
              width={78}
              height={25}
              alt="ping logo"
            />
          </h1>
        </div>
      </header>
      <main className="relative w-full">
        <section className="mt-8 mx-0 mb-4 w-full">
          <h2 className="my-4 text-3xl text-gray text-center font-light">
            We are launching{" "}
            <span className="text-dark_gray font-bold">soon!</span>
          </h2>
          <p className="font-light text-dark_gray text-center">
            Subscribe and get notified
          </p>
          <EmailInput />
          <div className="py-12 px-4 w-full h-auto flex items-center justify-center">
            <Image
              className="w-auto"
              src="/illustration-dashboard.png"
              priority="false"
              width={900}
              height={350}
              alt="ilustration image"
            />
          </div>
        </section>
      </main>
      <footer className="w-full pt-4 pb-8">
        <p className="text-center text-dark_gray">
          &copy; Copyright{" "}
          <a href="#" className="text-blue underline hover:no-underline">
            Prod
          </a>
          . All rights reserved.
        </p>
      </footer>
    </>
  );
}
