"use client";
import NeonAlert from "@/components/ui/Origin/Alert/examples/NeonAlert";
import SecondStepperTest from "@/components/example/SecondStepperTest";
import StepperTest from "@/components/example/StepperTest";
import BaseOriginAlert from "@/components/ui/Origin/Alert";
import CustomToast from "@/components/CustomToast";
import ProfileForm from "@/components/kokonutui/profile-03";
import LoginModal from "@/components/comp-326";
import CardSection from "@/components/layouts/Books";
import SoftAnimatedLogin from "@/components/ui/base/modal/Motion";
import { AnimatedCheckbox, Button } from "@/components/ui/base";
import TestTable from "@/components/ui/customs/Tables/origin/index.tsx";
import FancyDropdown from "@/components/ui/customs/ddown";
import CardDemo from "@/components/ui/customs/card";
import AnimatedSearchBar from "@/components/ui/customs/searchbar";
import TestNPoints from "./TestNPoints";
import NameFilesInput, { TNamedFiles } from "@/components/ui/base/file/Uploader";
import { useState } from "react";
import VercelType1Navbar from "@/components/ui/customs/Navbars/VercelType1";
import VercelType2Navbar from "@/components/ui/customs/Navbars/VercelType2";
import VercelNavbar from "@/components/ui/customs/Navbars/VercelType3";
import NavbarHamburguer from "@/components/layouts/MainApp/Navbar";
import AnimatedHero from "@/components/layouts/Homepage/Hero";
import HeroSection from "@/components/layouts/Homepage/Herov2";
import UsersTable from "@/components/utable";

export default function Home() {
  const [oldObj, setOldObj] = useState<Array<TNamedFiles>>();
  const [files, setFiles] = useState<Array<TNamedFiles>>();

  function filesChange(files: Array<TNamedFiles>) {
    setFiles(() => files);
    setOldObj(() => files);
  }

  function cleanActual() {
    setFiles(() => []);
  }

  function setOld() {
    setFiles(() => oldObj);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] animated-grid">
      <AnimatedHero />

      <HeroSection />

      <StepperTest />
      <SecondStepperTest />
      <NeonAlert />

      <VercelType1Navbar />
      <VercelType2Navbar />
      <VercelNavbar />
      <NavbarHamburguer />

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

      <TestNPoints />

      <div className="flex justify-center gap-20">
        <Button onClick={setOld}>Old</Button>
        <Button onClick={cleanActual}>clean</Button>

        <NameFilesInput files={files} handleChange={filesChange} />
      </div>

      <AnimatedSearchBar />

      <UsersTable />

      <CardSection />
    </div>
  );
}
