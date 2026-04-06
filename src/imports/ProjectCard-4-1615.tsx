import svgPaths from "./svg-2wmpxqhgga";
import imgThumbnailContainer from "figma:asset/9d807e32aa996b86071857e072c00a7ab514d975.png";

function ThumbnailContainer() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Thumbnail Container">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[rgba(255,255,255,0.12)] inset-0" />
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgThumbnailContainer} />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[6px] h-[23px] items-start relative shrink-0">
      <div className="bg-gradient-to-r content-stretch flex from-[#a8ff78] h-[24px] items-center justify-center px-[12px] py-[4px] relative rounded-[12px] shrink-0 to-[#78ffd6]" data-name="Tags">
        <p className="font-['Satoshi:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[12px] text-black text-center whitespace-nowrap">Featured</p>
      </div>
      <div className="content-stretch flex h-[24px] items-center justify-center px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Tags">
        <div aria-hidden="true" className="absolute border border-[#484250] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <p className="font-['Satoshi:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.87)] text-center whitespace-nowrap">Hobby</p>
      </div>
      <div className="content-stretch flex h-[24px] items-center justify-center px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Tags">
        <div aria-hidden="true" className="absolute border border-[#484250] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <p className="font-['Satoshi:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.87)] text-center whitespace-nowrap">Long-term</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-center relative shrink-0">
      <div className="bg-[#352a17] content-stretch flex h-[24px] items-center justify-center px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Tags">
        <div aria-hidden="true" className="absolute border border-[#614e2d] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <p className="font-['Satoshi:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[12px] text-[rgba(236,215,178,0.87)] text-center whitespace-nowrap">Deadline in 3 days</p>
      </div>
      <button className="content-stretch cursor-pointer flex items-center justify-center pb-[8.25px] pl-[9px] pr-[9.75px] pt-[7.5px] relative rounded-[9999px] shrink-0 size-[40px]" data-name="save button">
        <div aria-hidden="true" className="absolute border-[#312b3a] border-[0.75px] border-solid inset-0 pointer-events-none rounded-[9999px]" />
        <div className="h-[14.119px] relative shrink-0 w-[10.981px]" data-name="Vector">
          <div className="absolute inset-[-4.17%_-5.36%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.1579 15.2954">
              <path d={svgPaths.p1bccaab0} id="Vector" stroke="var(--stroke-0, #B599FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.17657" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame />
      <Frame1 />
    </div>
  );
}

function TitleContainer() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Title Container">
      <p className="flex-[1_0_0] font-['Satoshi:Bold',sans-serif] leading-[1.1] min-h-px min-w-px not-italic relative text-[24px] text-[rgba(255,255,255,0.87)]">Project Gnosis</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex font-['Satoshi:Regular',sans-serif] gap-[6px] items-start leading-[1.4] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.38)] whitespace-nowrap">
      <p className="relative shrink-0">Listed by @MQ Media</p>
      <p className="relative shrink-0">· 5 days ago</p>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Text">
      <Frame2 />
      <TitleContainer />
      <Frame3 />
      <p className="font-['Satoshi:Regular',sans-serif] leading-[1.4] min-w-full not-italic overflow-hidden relative shrink-0 text-[16px] text-[rgba(255,255,255,0.6)] text-ellipsis w-[min-content]">Welcome to Project Gnosis, a Narrated Audio Drama. Project Gnosis is a cyberpunk urban fantasy focused on exploring myths and legends from around the world. In this world, mythic creatures live throughout the world in secret. However, this secrecy is always near its breaking point due to conflicts.</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0">
      <div className="content-stretch flex h-[24px] items-center justify-center px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Tags">
        <div aria-hidden="true" className="absolute border border-[#484250] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <p className="font-['Satoshi:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.87)] text-center whitespace-nowrap">Illustrator</p>
      </div>
      <div className="content-stretch flex h-[24px] items-center justify-center px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Tags">
        <div aria-hidden="true" className="absolute border border-[#484250] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <p className="font-['Satoshi:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.87)] text-center whitespace-nowrap">Writer</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <p className="font-['Satoshi:Medium',sans-serif] leading-none min-w-full not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.6)] w-[min-content]">Looking for...</p>
      <Frame5 />
    </div>
  );
}

function ProjectInfo() {
  return (
    <div className="h-full relative shrink-0 w-[714px]" data-name="Project Info">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start justify-center px-[20px] py-[24px] relative size-full">
          <Text />
          <Frame4 />
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex h-[258px] items-center relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <ThumbnailContainer />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <ProjectInfo />
      </div>
    </div>
  );
}

export default function ProjectCard() {
  return (
    <div className="bg-[#1c1626] content-stretch flex flex-col items-center justify-center relative rounded-[8px] size-full" data-name="Project card">
      <Content />
    </div>
  );
}