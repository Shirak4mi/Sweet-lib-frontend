import NeonAlert from "@/components/ui/Origin/Alert/examples/NeonAlert";
import SecondStepperTest from "@/components/example/SecondStepperTest";
import StepperTest from "@/components/example/StepperTest";
import BaseOriginAlert from "@/components/ui/Origin/Alert";
import CustomToast from "@/components/CustomToast";
import ProfileForm from "@/components/kokonutui/profile-03";
import LoginModal from "@/components/comp-326";
import CardSection from "@/components/layouts/Books";
import SoftAnimatedLogin from "@/components/ui/base/modal/Motion";
import { AnimatedCheckbox } from "@/components/ui/base";
import TestTable from "@/components/ui/customs/Table";
import { AnimatedNumber } from "@/components/ui/Animated/AddUpNumbers";
import CountUpNumbers from "@/components/ui/Animated/CountUpNumbers";
import VercelNavbarT1 from "@/components/ui/customs/Navbars/VercelType2";
import NavigationMenuCustom from "@/components/ui/customs/Navmenu";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] animated-grid">
      <VercelNavbarT1 />
      <StepperTest />
      <SecondStepperTest />
      <NeonAlert />
      <BaseOriginAlert
        show
        type="danger"
        title="This is a error"
        details={["XD", "Something else"]}
        action={{ func: () => {}, label: "Action" }}
      />
      <CustomToast />
      <ProfileForm />
      <LoginModal />

      <SoftAnimatedLogin />

      <AnimatedCheckbox />

      <CountUpNumbers to={9000} separator="," />
      <AnimatedNumber value={100} />

      <NavigationMenuCustom />

      <TestTable />

      <CardSection />
    </div>
  );
}
