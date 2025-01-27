export const Header: React.FC = () => {
  return (
    <div className="bg-[#0D0D0D] w-full h-[200px]">
      <div className="flex justify-center h-full gap-3 items-center">
        <img src="/rocket1.svg" alt="Rocket-icon" />
        <h5 className="font-inter text-[#4EA8DE] text-[40px] font-[900]">
          Todo <span className="text-[#5E60CE] font-[900]">App</span>
        </h5>
      </div>
    </div>
  );
};
