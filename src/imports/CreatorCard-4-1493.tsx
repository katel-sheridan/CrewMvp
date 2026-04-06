import imgImageAstraArtist from "figma:asset/175da8e60cd46f2d6221fbd1cbbcae4215641936.png";
import imgImageWithFallback from "figma:asset/3bd82014a8f7a7aac4b565f00eff6440c95fc1a6.png";

function ImageAstraArtist() {
  return (
    <div className="relative rounded-[16777200px] shrink-0 size-[32px]" data-name="Image (AstraArtist)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[16777200px] size-full" src={imgImageAstraArtist} />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[17.594px] relative shrink-0 w-[92.953px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Satoshi:Bold',sans-serif] leading-[17.6px] left-0 not-italic text-[16px] text-[rgba(255,255,255,0.87)] top-[0.5px] whitespace-nowrap">@AstraArtist</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[32px] relative shrink-0 w-[280.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-center relative size-full">
        <ImageAstraArtist />
        <Text />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute bg-[#352d42] h-[19px] left-0 rounded-[12px] top-0 w-[37.273px]" data-name="Text">
      <p className="absolute font-['Satoshi:Medium',sans-serif] leading-[11px] left-[10px] not-italic text-[11px] text-[rgba(255,255,255,0.6)] top-[4.5px] tracking-[0.275px] uppercase whitespace-nowrap">OC</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute bg-[#352d42] h-[19px] left-[43.27px] rounded-[12px] top-0 w-[42.313px]" data-name="Text">
      <p className="absolute font-['Satoshi:Medium',sans-serif] leading-[11px] left-[10px] not-italic text-[11px] text-[rgba(255,255,255,0.6)] top-[4.5px] tracking-[0.275px] uppercase whitespace-nowrap">HSR</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute bg-[#352d42] h-[19px] left-[91.59px] rounded-[12px] top-0 w-[77.039px]" data-name="Text">
      <p className="absolute font-['Satoshi:Medium',sans-serif] leading-[11px] left-[10px] not-italic text-[11px] text-[rgba(255,255,255,0.6)] top-[4.5px] tracking-[0.275px] uppercase whitespace-nowrap">Romance</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[19px] relative shrink-0 w-[280.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text1 />
        <Text2 />
        <Text3 />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[280.664px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Satoshi:Regular',sans-serif] leading-[19.6px] left-0 not-italic text-[14px] text-[rgba(255,255,255,0.6)] top-px w-[281px]">{`I'm looking for someone to collab with to make a comic! I specialize in character design and digital painting.`}</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[146.188px] items-start left-0 pl-[16px] py-[16px] top-[234.49px] w-[312.664px]" data-name="Container">
      <Container1 />
      <Container2 />
      <Paragraph />
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="absolute h-[234.492px] left-0 top-0 w-[312.664px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Container5() {
  return <div className="bg-white rounded-[16777200px] shrink-0 size-[6px]" data-name="Container" />;
}

function Container6() {
  return <div className="bg-[rgba(255,255,255,0.4)] rounded-[16777200px] shrink-0 size-[6px]" data-name="Container" />;
}

function Container7() {
  return <div className="bg-[rgba(255,255,255,0.4)] flex-[1_0_0] h-[6px] min-h-px min-w-px rounded-[16777200px]" data-name="Container" />;
}

function Container4() {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[6px] items-start left-[141.33px] top-[220.49px] w-[30px]" data-name="Container">
      <Container5 />
      <Container6 />
      <Container7 />
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute bg-[rgba(14,1,28,0.6)] border border-[#544f5f] border-solid h-[22px] left-0 rounded-[12px] top-0 w-[81.633px]" data-name="Text">
      <p className="absolute font-['Satoshi:Medium',sans-serif] leading-[12px] left-[12px] not-italic text-[12px] text-[rgba(255,255,255,0.87)] top-[4.5px] whitespace-nowrap">Illustration</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute bg-[rgba(14,1,28,0.6)] border border-[#544f5f] border-solid h-[22px] left-[87.63px] rounded-[12px] top-0 w-[61.813px]" data-name="Text">
      <p className="absolute font-['Satoshi:Medium',sans-serif] leading-[12px] left-[12px] not-italic text-[12px] text-[rgba(255,255,255,0.87)] top-[4.5px] whitespace-nowrap">Hobby</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute h-[22px] left-[12px] top-[12px] w-[149.445px]" data-name="Container">
      <Text4 />
      <Text5 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[234.492px] left-0 overflow-clip top-0 w-[312.664px]" data-name="Container">
      <ImageWithFallback />
      <Container4 />
      <Container8 />
    </div>
  );
}

export default function CreatorCard() {
  return (
    <div className="bg-[#241e31] overflow-clip relative rounded-[8px] size-full" data-name="CreatorCard">
      <Container />
      <Container3 />
    </div>
  );
}