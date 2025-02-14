export default function ResponsiveImg({ img }) {
  return (
    <picture>
      <source
        media="(max-width: 575px)"
        srcSet={`/us/washcombo-all-in-one/images/static-scroll-video/Mobile/${img}`}
      />
      <source
        media="(max-width: 767px)"
        srcSet={`/us/washcombo-all-in-one/images/static-scroll-video/In-Between/${img}`}
      />
      <img
        src={`/us/washcombo-all-in-one/images/static-scroll-video/Tablet/${img}`}
        alt=""
      />
    </picture>
  );
}
