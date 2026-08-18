function StatisticsSection() {
  const stats = [
    {
      number: "50+",
      title: "Expert Doctors",
    },
    {
      number: "10K+",
      title: "Happy Patients",
    },
    {
      number: "25+",
      title: "Medical Departments",
    },
    {
      number: "15K+",
      title: "Appointments",
    },
  ];

  return (
    <section className="py-24 bg-[#123044] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#4FA3B8] font-semibold tracking-widest uppercase">
            MediFlow in Numbers
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold">
            Trusted Healthcare
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className="text-center border-r last:border-r-0 border-white/10"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-[#4FA3B8]">
                {item.number}
              </h3>

              <p className="mt-3 text-white/80">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatisticsSection;
