import React from 'react';
import './App.scss';

console.clear();

const slides = [
  {
    title: 'Willwill',
    subtitle: 'Ruby on Rails',
    description: 'for sharing designer inspirations',
    image:
      'https://res.cloudinary.com/willwang/image/upload/v1612495632/willwill_hjlznm.png',
  },
  {
    title: 'InfiHunt',
    subtitle: 'Github API',
    description: 'a site for dev job hunters',
    image:
      'https://res.cloudinary.com/willwang/image/upload/v1612495632/infihunt_txhqwv.png',
  },
  {
    title: 'devHUB',
    subtitle: 'MERN Stack',
    description: 'the dribbble for developers',
    image:
      'https://res.cloudinary.com/willwang/image/upload/v1612495632/devhub_ex90rw.png',
  },
  {
    title: 'Learn ASL',
    subtitle: 'Tensorflow.js',
    description: 'learn sign language with the help of AI',
    image:
      'https://res.cloudinary.com/willwang/image/upload/v1612493462/ASL_z9mzpm.png',
  },
];
const bgs = [
  'https://res.cloudinary.com/willwang/image/upload/v1612146695/Screen_Shot_2021-01-31_at_6.26.21_PM_lbfuez.png',
  'https://res.cloudinary.com/willwang/image/upload/v1612494162/Screen_Shot_2021-02-04_at_7.02.37_PM_e3mjbj.png',
  'https://res.cloudinary.com/willwang/image/upload/v1612494143/Screen_Shot_2021-02-04_at_7.02.17_PM_twlhkm.png',
  'https://res.cloudinary.com/willwang/image/upload/v1612494110/Screen_Shot_2021-02-04_at_7.01.13_PM_yumd7l.png',
];
const urls = [
  'http://www.willwang.org/',
  'https://infinite-hunt.herokuapp.com/',
  'http://getdevhub.herokuapp.com/#/',
  'https://yizhewill.github.io/tensor-game/',
];
function useTilt(active) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current || !active) {
      return;
    }

    const state = {
      rect: undefined,
      mouseX: undefined,
      mouseY: undefined,
    };

    let el = ref.current;

    const handleMouseMove = (e) => {
      if (!el) {
        return;
      }
      if (!state.rect) {
        state.rect = el.getBoundingClientRect();
      }
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      const px = (state.mouseX - state.rect.left) / state.rect.width;
      const py = (state.mouseY - state.rect.top) / state.rect.height;

      el.style.setProperty('--px', px);
      el.style.setProperty('--py', py);
    };

    el.addEventListener('mousemove', handleMouseMove);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, [active]);

  return ref;
}

const initialState = {
  slideIndex: 0,
};

const slidesReducer = (state, event) => {
  if (event.type === 'NEXT') {
    return {
      ...state,
      slideIndex: (state.slideIndex + 1) % slides.length,
    };
  }
  if (event.type === 'PREV') {
    return {
      ...state,
      slideIndex:
        state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1,
    };
  }
};

function Slide({ slide, offset, i, url }) {
  const active = offset === 0 ? true : null;
  const ref = useTilt(active);
  console.log(bgs[i]);
  return (
    <a
      href={url}
      ref={ref}
      className='slide'
      data-active={active}
      target='_blank'
      style={{
        textDecoration: 'none',
        color: 'white',
        '--offset': offset,
        '--dir': offset === 0 ? 0 : offset > 0 ? 1 : -1,
      }}
    >
      <div
        className='slideBackground'
        style={{
          backgroundImage: `url(${bgs[i]})`,
        }}
      />
      <div
        className='slideContent'
        style={{
          backgroundImage: `url('${slide.image}')`,
        }}
      >
        <div className='slideContentInner'>
          <h2 className='slideTitle'>{slide.title}</h2>
          <h3 className='slideSubtitle'>{slide.subtitle}</h3>
          <p className='slideDescription'>{slide.description}</p>
        </div>
      </div>
    </a>
  );
}

export default function App() {
  const [state, dispatch] = React.useReducer(slidesReducer, initialState);

  return (
    <div className='slides'>
      <button onClick={() => dispatch({ type: 'PREV' })}>‹</button>

      {[...slides, ...slides, ...slides].map((slide, i) => {
        let offset = slides.length + (state.slideIndex - i);
        let index = Math.abs(i % slides.length);
        return (
          <Slide
            slide={slide}
            offset={offset}
            key={i}
            i={index}
            url={urls[index]}
          />
        );
      })}
      <button onClick={() => dispatch({ type: 'NEXT' })}>›</button>
    </div>
  );
}
