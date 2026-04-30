interface IProps {
  width?: string;
  height?: string;
  fillColor?: string;
  scale?: number;
  className?: string;
}

const FacebookIconSVG = ({
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
      <path
        d="M28 14C28 6.2686 21.7314 0 14 0C6.2686 0 0 6.2686 0 14C0 20.9872 5.11883 26.7794 11.8127 27.8307V18.0478H8.25707V14H11.8127V10.9149C11.8127 7.40655 13.9035 5.4673 17.1008 5.4673C18.6325 5.4673 20.2351 5.74097 20.2351 5.74097V9.18633H18.4691C16.7307 9.18633 16.1873 10.2652 16.1873 11.3736V14H20.0698L19.4496 18.0478H16.1873V27.8307C22.8812 26.7813 28 20.9892 28 14Z"
        fill="#1977F3"
      />
      <path
        d="M19.4494 18.0478L20.0695 14H16.1871V11.3736C16.1871 10.2672 16.7285 9.18631 18.4689 9.18631H20.2349V5.74095C20.2349 5.74095 18.6323 5.46729 17.1006 5.46729C13.9033 5.46729 11.8125 7.40457 11.8125 10.9149V14H8.25684V18.0478H11.8125V27.8307C12.5252 27.9429 13.2556 28 13.9998 28C14.744 28 15.4744 27.9409 16.1871 27.8307V18.0478H19.4494Z"
        fill="#FEFEFE"
      />
    </svg>
  );
};

export default FacebookIconSVG;
