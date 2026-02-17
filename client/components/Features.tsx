import { Globe, Users, Microscope, Club, Heart, Users2, Activity, Leaf, Music, Lightbulb, Award } from "lucide-react";

const features = [
  {
    id: 1,
    icon: Globe,
    title: "Global Academic Tie-ups",
    description: "Global academic tie-ups for student exchange programs",
  },
  {
    id: 2,
    icon: Users,
    title: "100,000+ Alumni",
    description: "100000+ global alumni making a positive impact",
  },
  {
    id: 3,
    icon: Microscope,
    title: "Research Centers",
    description: "Dedicated research centres for experiential learning",
  },
  {
    id: 4,
    icon: Club,
    title: "Student Clubs",
    description: "Diverse student clubs across interests",
  },
  {
    id: 5,
    icon: Heart,
    title: "Diversity & Inclusion",
    description: "Commitment to diversity, equity and inclusivity",
  },
  {
    id: 6,
    icon: Users2,
    title: "Faculty Excellence",
    description: "5500+ faculty members offering top-class mentorship",
  },
  {
    id: 7,
    icon: Activity,
    title: "Hospital Training",
    description:
      "1200-bed multispecialty NABH-accredited hospital providing clinical exposure and training to students",
  },
  {
    id: 8,
    icon: Award,
    title: "Sports Facilities",
    description:
      "Strong emphasis on sports with indoor sports complexes, 400-meter athletic turf track and grounds for football, hockey and cricket",
  },
  {
    id: 9,
    icon: Lightbulb,
    title: "Student Research Fund",
    description:
      "Student research supported by the Nitte University Student Research Fund and Atal Incubation Centre",
  },
  {
    id: 10,
    icon: Leaf,
    title: "Sustainable Campus",
    description:
      "Sustainable campuses with rainwater harvesting, solar energy harnessing, and a welcoming environment for migratory birds",
  },
  {
    id: 11,
    icon: Music,
    title: "Campus Life",
    description:
      "Vibrant campus life with TEDx events, Nitte Vibes, Incridea & International film festivals",
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Why Choose KGI?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-red-700 bg-opacity-10 rounded-full p-4">
                    <IconComponent
                      size={40}
                      className="text-red-700"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
