import Message from '@/components/Message';
import Metadata from '@/components/Metadata';
import RenderHtmlContent from '@/components/RenderHtmlContent';
import classNames from 'classnames';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaFacebookSquare, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

function AcheterUneOffre({ option, product }: { option: string; product: string }) {
  const text =
    "La solution de ZEEVEN nous a rendu la vie beaucoup plus facile. <br/> La création de codes QR est rapide L'envoi de messages est simple.<br /> Pouvoir suivre leurs performances s'est avéré essentiel pour notre entreprise.";

  const router = useRouter();
  return (
    <>
      <Metadata entry={{ title: 'Validez votre commande' }} />
      <section className="h-screen md:grid md:grid-cols-2">
        <div className="description flex flex-col justify-between bg-app-blue text-white">
          <Link href="/" className={`mx-6 mb-6 mt-6 text-4xl !font-extrabold text-white`}>
            ZEEVEN
          </Link>
          <div className="hidden px-10 text-xl font-light md:block">
            <p className="text-xl">Adeline</p>
            <p className="mb-1 text-sm italic">CEO OLCEDEREVENTS</p>
            <RenderHtmlContent content={text} classes="text-white bg-white/20 rounded-xl p-6" />
          </div>
          <div className="hidden w-full items-center justify-between bg-white/20 px-6 py-2 text-white md:flex">
            <span> &copy; Copyright {new Date().getFullYear()}</span>
            <div className="flex">
              <Link
                href="https://www.facebook.com/Chillotech-103869952427034"
                className="text-slate-300 hover:text-white"
              >
                <FaFacebookSquare className="mr-4 text-4xl" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/86905161"
                className="mr-2 text-slate-300 hover:text-white"
              >
                <FaLinkedinIn color="text-slate-300" className="text-4xl" />
              </Link>
              <Link
                target="_blank"
                href="https://wa.me/0033761705745"
                className="mr-2 text-slate-300 hover:text-white"
              >
                <FaWhatsapp color="text-slate-300" className="text-4xl" />
              </Link>
            </div>
          </div>
        </div>
        <article className="flex flex-col justify-center p-3">
          <div className="py-3">
            <div
              className={classNames(
                'border border-blue-200',
                'relative rounded-2xl rounded-xl bg-white px-10 py-8 shadow-lg',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <Message
                type="success"
                firstMessage="Encore merci pour confiance"
                secondMessage="Vootre paiement a bien été enregistré"
                action={() => router.push('/')}
                actionLabel="Retourner à l'accueil"
              />
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
export default AcheterUneOffre;