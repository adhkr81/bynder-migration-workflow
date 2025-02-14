import TwoHrWash from "./svg/two-hr-wash.svg";
import Ventless from "./svg/ventless.svg";
import Electrical from "./svg/electrical.svg";
import DownChev from "./svg/down-chev.svg";
import CarouselArrow from "./svg/carousel-arrow.svg";
import Clothes from "./svg/clothes-hero.svg";
import PaperPlane from "./svg/paper-plane.svg";

export default function Icon({ name, className }) {
  const icons = {
    TwoHrWash: <TwoHrWash name={name} className={className} />,
    Ventless: <Ventless name={name} className={className} />,
    Electrical: <Electrical name={name} className={className} />,
    DownChev: <DownChev name={name} className={className} />,
    CarouselArrow: <CarouselArrow name={name} className={className} />,
    Clothes: <Clothes name={name} className={className} />,
    PaperPlane: <PaperPlane name={name} className={className} />,
  };

  const path = icons[name];

  if (!path) {
    return null;
  } else {
    return icons[name];
  }
}
