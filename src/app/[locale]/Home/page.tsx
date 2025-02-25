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
import FancyDropdown from "@/components/ui/customs/ddown";
import CardDemo from "@/components/ui/customs/card";
import AnimatedSearchBar from "@/components/ui/customs/searchbar";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] animated-grid">
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

      <FancyDropdown />

      <CardDemo />

      <TestTable />

      <AnimatedSearchBar />

      <CardSection />
    </div>
  );
}
