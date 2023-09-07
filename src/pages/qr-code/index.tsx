import Metadata from '@/components/Metadata';
import RenderHtmlContent from '@/components/RenderHtmlContent';
import ImageDisplay from '@/components/image-display';
import QRCodeEmailMessage from '@/components/qr-code/QRCodeEmailMessage';
import QRCodeMessage from '@/components/qr-code/QRCodeMessage';
import QRCodePhone from '@/components/qr-code/QRCodePhone';
import QRCodeText from '@/components/qr-code/QRCodeText';
import QRCodeVCARD from '@/components/qr-code/QRCodeVCARD';
import QRCodeWifi from '@/components/qr-code/QRCodeWifi';
import OutlineLink from '@/components/shared/OutlineLink';
import OpenedLayout from '@/containers/opened';
import { fetchData, handleError } from '@/services';
import { PAGE_FIELDS, QR_CODES_TYPES, slugify } from '@/utils';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { useState } from 'react';
import { BsChatDots, BsEnvelopeAtFill, BsEnvelopeFill, BsMailbox, BsPersonVcard, BsPhoneFill, BsTextCenter, BsWhatsapp, BsWifi } from 'react-icons/bs';
import { TfiWorld } from 'react-icons/tfi';
import { useQuery } from 'react-query';

function QRCode() {
  const [data, setData] = useState<any>({});

  useQuery<any>({
    queryKey: ['les-QRCode'],
    queryFn: () =>
      fetchData({
        path: `/api/backoffice/page/8`,
        fields: PAGE_FIELDS,
      }),
    onError: handleError,
    onSuccess: (data) => {
      setData(data.data.data);
    },
  });
  return (
    <OpenedLayout>
      <Metadata
        entry={{
          title: 'QR codes dynamiques pour votre marque',
          description: 'Créez, suivez et gérez des codes QR dynamiques pour votre marque',
        }}
      />
      <div className="container py-10 text-center font-sans">
        <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
          QR codes dynamiques pour votre marque
        </h1>
        <h3 className="text-slate-900 sm:text-xl">
          <RenderHtmlContent content={data?.sublabel} />
        </h3>
      </div>
      <section className="container mx-auto mb-10 md:p-0">
        <div className="overflow-hidden rounded-lg border-2 border-blue-300 bg-white">
          <Tab.Group>
            <Tab.List className="grid grid-cols-2 rounded-lg bg-blue-700/80 p-1 md:grid-cols-5">
              {QR_CODES_TYPES.map((item: any) => (
                <Tab
                  key={`label-${slugify(item.label)}`}
                  className={({ selected }) =>
                    classNames(
                      'flex items-center justify-center',
                      'text-md rounded-lg py-2.5 font-medium leading-5 text-app-blue md:w-full',
                      'ring-white ring-opacity-60 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'mr-2 bg-white shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                >
                  {item.value === 'LINK' ? <TfiWorld className="mr-4" /> : null}
                  {item.value === 'SMS' ? <BsChatDots className="mr-4" /> : null}
                  {item.value === 'WHATSAPP' ? <BsWhatsapp className="mr-4" /> : null}
                  {item.value === 'WIFI' ? <BsWifi className="mr-4" /> : null}
                  {item.value === 'VCARD' ? <BsPersonVcard className="mr-4" /> : null}
                  {item.value === 'TEXT' ? <BsTextCenter className="mr-4" /> : null}
                  {item.value === 'PHONE' ? <BsPhoneFill className="mr-4" /> : null}
                  {item.value === 'EMAIL' ? <BsEnvelopeFill className="mr-4" /> : null}
                  {item.label}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              {QR_CODES_TYPES.map(
                ({ label, value, ...rest }: { label: string; value: string }) => (
                  <Tab.Panel
                    key={`value-${slugify(label)}`}
                    className={classNames(
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                    )}
                  >
                    {
                      {
                        LINK: (
                          <QRCodeText
                            placeholder="Votre lien"
                            type={value}
                            params={rest}
                          />
                        ),
                        TEXT: (
                          <QRCodeText
                            placeholder="Votre texte"
                            type={value}
                            params={rest}
                          />
                        ),
                        SMS: (
                          <QRCodeMessage
                            type={value}
                            params={rest}
                          />
                        ),
                        PHONE: (
                          <QRCodePhone
                            type={value}
                            params={rest}
                          />
                        ),
                        WHATSAPP: (
                          <QRCodeMessage
                            type={value}
                            params={rest}
                          />
                        ),
                        EMAIL: (
                          <QRCodeEmailMessage
                            type={value}
                            params={rest}
                          />
                        ),
                        WIFI: (
                          <QRCodeWifi
                            type={value}
                            params={rest}
                          />
                        ),
                        VCARD: (
                          <QRCodeVCARD
                            type={value}
                            params={rest}
                          />
                        ),
                      }[value]
                    }
                  </Tab.Panel>
                )
              )}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
      <section className="mx-auto mb-10 bg-app-light-gray pb-10">
        <div className="container">
          <RenderHtmlContent content={data?.abstract} classes="text-center py-10" />
          {data?.articles?.map(({ article_id }: any, index: number) => (
            <article
              className={classNames(
                'mx-auto mb-8 items-center rounded-xl border border-app-light-blue px-4  shadow-md md:w-11/12',
                { 'pb-5 pt-5': index === 0 },
                { 'grid gap-4 pb-8 pt-5 md:grid-cols-3 md:gap-10': index !== 0 },
                { 'bg-app-light-blue': index % 2 === 0 },
                { 'bg-white ': index % 2 !== 0 }
              )}
              key={`article-${data.id}-${article_id.id}`}
            >
              <div className={classNames({ 'md:col-span-2': index !== 0 })}>
                <h3 className="mt-4 text-lg font-extrabold text-black md:px-0 md:text-3xl">
                  <span className="text-app-blue">{article_id.label}</span>
                </h3>
                <p>{article_id.sublabel}</p>
                <RenderHtmlContent content={article_id?.abstract} classes="py-4" />
              </div>
              {article_id.articles && article_id.articles.length ? (
                <article className="flex flex-col gap-4 py-4 md:flex-row">
                  {article_id.articles?.map(({ related_article_id }: any) => (
                    <div
                      className="relative flex flex-col items-start justify-between rounded-lg border border-app-light-blue bg-app-light-blue pb-10 pt-5 md:w-11/12 md:px-10"
                      key={`article-${data.id}-${related_article_id.id}`}
                    >
                      <div>
                        <h3 className="mb-4 text-lg font-extrabold text-black md:px-0 md:text-3xl">
                          <span className="text-app-blue">{related_article_id.label}</span>
                        </h3>
                        <p>{related_article_id.sublabel}</p>
                        <RenderHtmlContent
                          content={related_article_id?.description}
                          classes="mb-4"
                        />
                      </div>
                      <OutlineLink label="Génrer un QR CODE" link="/qr-code" />
                      <div className="absolute bottom-2 right-2 h-16 w-16">
                        <ImageDisplay
                          wrapperClasses="h-full relative overflow-hidden"
                          imageClasses="object-contain"
                          image={related_article_id.images[0].directus_files_id}
                        />
                      </div>
                    </div>
                  ))}
                </article>
              ) : null}
              <ImageDisplay
                wrapperClasses="h-40 md:h-80 relative overflow-hidden md:rounded-full"
                imageClasses="object-contain"
                image={article_id.images[0].directus_files_id}
              />
            </article>
          ))}
        </div>
      </section>
    </OpenedLayout>
  );
}

export default QRCode;
