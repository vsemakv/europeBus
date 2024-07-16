// export default function ({ route, redirect }) {
//     // проверяем, есть ли в текущем маршруте якорь
//     if (route.hash) {
//         // удаляем якорь из URL и перенаправляем на новый URL без якоря
//         redirect(301, route.fullPath.replace(route.hash, ''));
//     }
// }

// export default function ({ route, redirect }) {
//     if (route.hash) {
//       return redirect(301, `${route.path}`)
//     }
//   }