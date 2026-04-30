interface IProps {
  width?: string;
  height?: string;
  fillColor?: string;
  scale?: number;
  className?: string;
}

const GoogleIconSVG = ({
  fillColor = 'none',
  height = '28',
  width = '28',
  scale = 1,
  className = '',
}: IProps) => {
  const scaledWidth = `${parseInt(width) * scale}`;
  const scaledHeight = `${parseInt(height) * scale}`;
  return (
    <svg
      width={scaledWidth}
      height={scaledHeight}
      viewBox="0 0 28 28"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <mask
        id="mask0_61_3038"
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="28"
        height="28"
      >
        <path
          d="M27.7311 11.4027H14.2982V16.7852H22.0168C21.8927 17.547 21.6141 18.2964 21.2061 18.9797C20.7387 19.7625 20.1608 20.3586 19.5684 20.8124C17.7941 22.1721 15.7255 22.4501 14.2889 22.4501C10.6597 22.4501 7.55887 20.1045 6.35847 16.9173C6.31002 16.8017 6.27786 16.6822 6.23869 16.5641C5.97342 15.7529 5.82849 14.8938 5.82849 14.0009C5.82849 13.0716 5.98543 12.182 6.2716 11.3419C7.40039 8.02831 10.5712 5.5534 14.2915 5.5534C15.0398 5.5534 15.7604 5.64248 16.4437 5.82014C18.0055 6.22615 19.1102 7.02581 19.7871 7.65833L23.8715 3.65838C21.387 1.38036 18.1481 3.44421e-09 14.2847 3.44421e-09C11.1961 -6.64758e-05 8.34458 0.962245 6.00787 2.58858C4.11286 3.9075 2.55869 5.67336 1.50981 7.72421C0.534206 9.62577 0 11.7331 0 13.9988C0 16.2646 0.535022 18.3938 1.51063 20.2778V20.2905C2.54112 22.2906 4.04804 24.0127 5.87954 25.3256C7.47955 26.4725 10.3485 28 14.2847 28C16.5482 28 18.5544 27.5919 20.3236 26.8271C21.6 26.2753 22.7308 25.5557 23.7546 24.6309C25.1074 23.4088 26.1669 21.8973 26.89 20.1582C27.6132 18.4192 28 16.4526 28 14.3204C28 13.3275 27.9003 12.3191 27.7311 11.4026V11.4027Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_61_3038)">
        <g filter="url(#filter0_f_61_3038)">
          <path
            d="M-0.206055 14.0942C-0.191207 16.3243 0.444245 18.6252 1.40611 20.4826V20.4954C2.1011 21.8443 3.05095 22.9099 4.13282 23.9656L10.667 21.5814C9.43079 20.9535 9.24216 20.5687 8.35598 19.8665C7.45038 18.9534 6.77544 17.905 6.35511 16.6758H6.33817L6.35511 16.663C6.07858 15.8513 6.0513 14.9897 6.0411 14.0942H-0.206055Z"
            fill="url(#paint0_radial_61_3038)"
          />
        </g>
        <g filter="url(#filter1_f_61_3038)">
          <path
            d="M14.298 -0.101562C13.6521 2.16736 13.8991 4.37283 14.298 5.65607C15.0438 5.65663 15.7622 5.74553 16.4435 5.92263C18.0052 6.32865 19.1098 7.12832 19.7867 7.76084L23.9756 3.65871C21.4941 1.38341 18.5077 -0.0979777 14.298 -0.101562Z"
            fill="url(#paint1_radial_61_3038)"
          />
        </g>
        <g filter="url(#filter2_f_61_3038)">
          <path
            d="M14.2843 -0.119629C11.1164 -0.119697 8.19169 0.867319 5.79499 2.53541C4.90509 3.15478 4.08845 3.87025 3.36129 4.66586C3.17079 6.45303 4.78733 8.64965 7.98857 8.63147C9.5418 6.82471 11.839 5.65575 14.3958 5.65575C14.3981 5.65575 14.4004 5.65594 14.4027 5.65595L14.2983 -0.11922C14.2936 -0.119223 14.289 -0.119629 14.2843 -0.119629Z"
            fill="url(#paint2_radial_61_3038)"
          />
        </g>
        <g filter="url(#filter3_f_61_3038)">
          <path
            d="M24.7399 14.7409L21.9123 16.6834C21.7883 17.4451 21.5095 18.1945 21.1015 18.8778C20.634 19.6607 20.0561 20.2567 19.4638 20.7106C17.6931 22.0674 15.63 22.3468 14.1937 22.3479C12.7092 24.8763 12.449 26.1428 14.2981 28.1834C16.5863 28.1817 18.6149 27.7687 20.4042 26.9952C21.6977 26.4361 22.8436 25.7068 23.8812 24.7695C25.2521 23.5311 26.326 21.9992 27.0588 20.2368C27.7917 18.4744 28.1836 16.4815 28.1836 14.3208L24.7399 14.7409Z"
            fill="url(#paint3_radial_61_3038)"
          />
        </g>
        <g filter="url(#filter4_f_61_3038)">
          <path
            d="M14.0894 11.1982V16.9898H27.6933C27.813 16.1966 28.2087 15.1702 28.2087 14.3206C28.2087 13.3276 28.109 12.1147 27.9399 11.1982H14.0894Z"
            fill="#3086FF"
          />
        </g>
        <g filter="url(#filter5_f_61_3038)">
          <path
            d="M3.42614 4.46143C2.58664 5.37996 1.86944 6.40806 1.30079 7.51994C0.325198 9.42149 -0.208984 11.7333 -0.208984 13.999C-0.208984 14.0309 -0.206342 14.0622 -0.206129 14.094C0.225931 14.9224 5.76199 14.7638 6.04103 14.094C6.04068 14.0628 6.03715 14.0323 6.03715 14.001C6.03715 13.0717 6.19415 12.3867 6.48032 11.5466C6.83335 10.5103 7.38612 9.55594 8.09295 8.73373C8.25318 8.52916 8.68058 8.08939 8.80527 7.82561C8.85277 7.72513 8.71903 7.66874 8.71155 7.63337C8.70319 7.59382 8.52389 7.62563 8.48372 7.59616C8.35617 7.50261 8.10361 7.45376 7.95024 7.41033C7.62244 7.31752 7.07918 7.11283 6.77744 6.90065C5.82363 6.22995 4.33514 5.42882 3.42614 4.46143Z"
            fill="url(#paint4_radial_61_3038)"
          />
        </g>
        <g filter="url(#filter6_f_61_3038)">
          <path
            d="M6.79805 7.63718C9.00982 8.97697 9.64589 6.96091 11.1164 6.33004L8.55839 1.02539C7.61741 1.42088 6.72837 1.91225 5.90348 2.48636C4.67158 3.34377 3.58371 4.39004 2.68506 5.58071L6.79805 7.63718Z"
            fill="url(#paint5_radial_61_3038)"
          />
        </g>
        <g filter="url(#filter7_f_61_3038)">
          <path
            d="M7.69834 21.1713C4.72932 22.2432 4.26451 22.2816 3.99121 24.1216C4.51347 24.6313 5.0746 25.1027 5.67088 25.5301C7.2709 26.6771 10.3486 28.2046 14.2848 28.2046C14.2894 28.2046 14.2938 28.2042 14.2984 28.2042V22.2455C14.2955 22.2455 14.292 22.2457 14.2891 22.2457C12.8151 22.2457 11.6373 21.8585 10.4296 21.1853C10.1319 21.0193 9.59168 21.465 9.31707 21.2658C8.93833 20.991 8.02684 21.5026 7.69834 21.1713Z"
            fill="url(#paint6_radial_61_3038)"
          />
        </g>
        <g opacity="0.5" filter="url(#filter8_f_61_3038)">
          <path
            d="M12.5596 22.0576V28.1008C13.1103 28.1653 13.6835 28.2044 14.2847 28.2044C14.8875 28.2044 15.4706 28.1735 16.0372 28.1165V22.0983C15.4022 22.2069 14.8042 22.2455 14.289 22.2455C13.6957 22.2455 13.1187 22.1764 12.5596 22.0576Z"
            fill="url(#paint7_linear_61_3038)"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_61_3038"
          x="-0.676134"
          y="13.6242"
          width="11.8132"
          height="10.8117"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.23504"
            result="effect1_foregroundBlur_61_3038"
          />
        </filter>
        <filter
          id="filter1_f_61_3038"
          x="13.4308"
          y="-0.571642"
          width="11.0149"
          height="8.80246"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.23504"
            result="effect1_foregroundBlur_61_3038"
          />
        </filter>
        <filter
          id="filter2_f_61_3038"
          x="2.87611"
          y="-0.589708"
          width="11.9968"
          height="9.69114"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.23504"
            result="effect1_foregroundBlur_61_3038"
          />
        </filter>
        <filter
          id="filter3_f_61_3038"
          x="12.525"
          y="13.8507"
          width="16.1286"
          height="14.803"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.23504"
            result="effect1_foregroundBlur_61_3038"
          />
        </filter>
        <filter
          id="filter4_f_61_3038"
          x="13.6193"
          y="10.7282"
          width="15.0593"
          height="6.73166"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.23504"
            result="effect1_foregroundBlur_61_3038"
          />
        </filter>
        <filter
          id="filter5_f_61_3038"
          x="-0.679064"
          y="3.99135"
          width="9.96457"
          height="11.136"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.23504"
            result="effect1_foregroundBlur_61_3038"
          />
        </filter>
        <filter
          id="filter6_f_61_3038"
          x="-0.619792"
          y="-2.27946"
          width="15.0409"
          height="13.6717"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="1.65243"
            result="effect1_foregroundBlur_61_3038"
          />
        </filter>
        <filter
          id="filter7_f_61_3038"
          x="3.52113"
          y="20.6774"
          width="11.2473"
          height="7.99729"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.23504"
            result="effect1_foregroundBlur_61_3038"
          />
        </filter>
        <filter
          id="filter8_f_61_3038"
          x="12.0895"
          y="21.5875"
          width="4.4177"
          height="7.08713"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.23504"
            result="effect1_foregroundBlur_61_3038"
          />
        </filter>
        <radialGradient
          id="paint0_radial_61_3038"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-0.581842 -13.9439 20.9196 -0.83676 10.5362 23.7555)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.141612" stopColor="#1ABD4D" />
          <stop offset="0.247515" stopColor="#6EC30D" />
          <stop offset="0.311547" stopColor="#8AC502" />
          <stop offset="0.366013" stopColor="#A2C600" />
          <stop offset="0.445673" stopColor="#C8C903" />
          <stop offset="0.540305" stopColor="#EBCB03" />
          <stop offset="0.615636" stopColor="#F7CD07" />
          <stop offset="0.699345" stopColor="#FDCD04" />
          <stop offset="0.771242" stopColor="#FDCE05" />
          <stop offset="0.860566" stopColor="#FFCE0A" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_61_3038"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(9.88128 -2.37483e-05 -1.38885e-05 12.4941 23.5838 7.46404)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.408458" stopColor="#FB4E5A" />
          <stop offset="1" stopColor="#FF4540" />
        </radialGradient>
        <radialGradient
          id="paint2_radial_61_3038"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-13.8444 7.50741 10.4052 18.3936 18.1878 -1.9282)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.231273" stopColor="#FF4541" />
          <stop offset="0.311547" stopColor="#FF4540" />
          <stop offset="0.457516" stopColor="#FF4640" />
          <stop offset="0.540305" stopColor="#FF473F" />
          <stop offset="0.699346" stopColor="#FF5138" />
          <stop offset="0.771242" stopColor="#FF5B33" />
          <stop offset="0.860566" stopColor="#FF6C29" />
          <stop offset="1" stopColor="#FF8C18" />
        </radialGradient>
        <radialGradient
          id="paint3_radial_61_3038"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-25.1072 -32.0888 -12.0979 9.07377 14.504 26.3712)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.131546" stopColor="#0CBA65" />
          <stop offset="0.209784" stopColor="#0BB86D" />
          <stop offset="0.297297" stopColor="#09B479" />
          <stop offset="0.396257" stopColor="#08AD93" />
          <stop offset="0.477124" stopColor="#0AA6A9" />
          <stop offset="0.568425" stopColor="#0D9CC6" />
          <stop offset="0.667385" stopColor="#1893DD" />
          <stop offset="0.768727" stopColor="#258BF1" />
          <stop offset="0.858506" stopColor="#3086FF" />
        </radialGradient>
        <radialGradient
          id="paint4_radial_61_3038"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-1.77678 14.9942 21.1751 2.4053 13.0713 2.52491)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.366013" stopColor="#FF4E3A" />
          <stop offset="0.457516" stopColor="#FF8A1B" />
          <stop offset="0.540305" stopColor="#FFA312" />
          <stop offset="0.615636" stopColor="#FFB60C" />
          <stop offset="0.771242" stopColor="#FFCD0A" />
          <stop offset="0.860566" stopColor="#FECF0A" />
          <stop offset="0.915033" stopColor="#FECF08" />
          <stop offset="1" stopColor="#FDCD01" />
        </radialGradient>
        <radialGradient
          id="paint5_radial_61_3038"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-5.13581 5.56124 -16.0209 -14.1827 10.5728 2.36922)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.315904" stopColor="#FF4C3C" />
          <stop offset="0.603818" stopColor="#FF692C" />
          <stop offset="0.726837" stopColor="#FF7825" />
          <stop offset="0.884534" stopColor="#FF8D1B" />
          <stop offset="1" stopColor="#FF9F13" />
        </radialGradient>
        <radialGradient
          id="paint6_radial_61_3038"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-13.8444 -7.5074 10.4052 -18.3936 18.188 29.9281)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.231273" stopColor="#0FBC5F" />
          <stop offset="0.311547" stopColor="#0FBC5F" />
          <stop offset="0.366013" stopColor="#0FBC5E" />
          <stop offset="0.457516" stopColor="#0FBC5D" />
          <stop offset="0.540305" stopColor="#12BC58" />
          <stop offset="0.699346" stopColor="#28BF3C" />
          <stop offset="0.771242" stopColor="#38C02B" />
          <stop offset="0.860566" stopColor="#52C218" />
          <stop offset="0.915033" stopColor="#67C30F" />
          <stop offset="1" stopColor="#86C504" />
        </radialGradient>
        <linearGradient
          id="paint7_linear_61_3038"
          x1="12.5596"
          y1="25.131"
          x2="16.0372"
          y2="25.131"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0FBC5C" />
          <stop offset="1" stopColor="#0CBA65" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default GoogleIconSVG;
