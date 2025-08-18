const CompanyButtons = () => {
  return (
    <div className="w-full flex justify-end flex-wrap gap-3">
      <button
        type="submit"
        className="bg-[#3C85E5] min-w-[190px] p-3 text-base text-white rounded-md transition-all duration-300 hover:bg-[#336FCC] hover:shadow-lg"
      >
        Save
      </button>
      <button
        type="reset"
        className="bg-[#F2F3F7] min-w-[190px] p-3 text-base text-[#000] rounded-md transition-all duration-300 hover:bg-[#ececf0] hover:shadow-lg"
      >
        Reset
      </button>
    </div>
  );
};

export default CompanyButtons;
