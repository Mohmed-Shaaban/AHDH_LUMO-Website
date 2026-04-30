import FacebookIconSVG from './svg/FacebookIconSVG';
import GoogleIconSVG from './svg/GoogleIconSVG';
import { Button } from './ui/button';

const OAuthLogin = () => {
  return (
    <div className="flex w-full flex-col gap-3 md:flex-row">
      <Button className="flex w-full gap-2 rounded-full py-5!">
        <GoogleIconSVG />
        <span>Google</span>
      </Button>
      <Button className="flex w-full gap-2 rounded-full py-5!">
        <FacebookIconSVG />
        <span>Facebook</span>
      </Button>
    </div>
  );
};

export default OAuthLogin;
