import Lottie from 'react-lottie';

import loadingGIF from '../../public/assets/lottie/loading.json';

export function Loading() {
  return (
    <div className="flex justify-center items-center">
      <Lottie
        options={{
          animationData: loadingGIF,
          loop: true,
          autoplay: true,
        }}
        speed={2}
      />
    </div>
  );
}
