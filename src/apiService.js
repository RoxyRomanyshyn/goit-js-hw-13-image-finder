export default function resApi(search, page, callBack) {
  fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${search}&page=${page}&per_page=12&key=17195229-890eab4d4ceb15a1b34ad06cf`)
    .then(j => j.json())
    .then(d => callBack(d));
  return callBack;
}
