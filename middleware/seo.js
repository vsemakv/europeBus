import { getLocaleFromRoute } from '/static/js/i18n'

export default async function ({ route, store }) {

    // console.log("route", route.path);
    // Получаем локаль из маршрута
    const locale = getLocaleFromRoute(route)
    // console.log("locale", locale);

    const messages = require(`~/locales/${locale}.json`)

    // console.log("messages", messages);

    // Устанавливаем заголовок и описание страницы из сообщений



  // console.log("route.path", route.path);
  const pageTitle = messages['seo'][route.path]?.title ? messages["seo"][route.path].title : messages["seo"].default.title
  // console.log('pageTitle', pageTitle);
  const pageDescription = messages['seo'][route.path]?.description ? messages["seo"][route.path].description : messages["seo"].default.description

  const metaInfo = {
    title: pageTitle,
    description: pageDescription,
  } 

  // console.log(metaInfo);

  const page = await store.dispatch('seo/get', metaInfo);

}
