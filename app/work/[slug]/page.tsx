
import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import Logo from "@/components/Logo";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { projects } from "../../../lib/projects";
import ProjectDetailsAnimation from "../../../components/ProjectDetailsAnimation";



type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Labib",
    };
  }

  return {
    title: `${project.name} | Labib`,
    description: project.description,
  };
}

export default async function ProjectDetailsPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const projectIndex = projects.findIndex(
    (item) => item.slug === slug
  );

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const nextProject =
    projects[(projectIndex + 1) % projects.length];

  return (
    <ProjectDetailsAnimation>
      <main className="min-h-screen overflow-hidden bg-[#f7f6f2] text-[#20201e]">
        {/* HEADER */}
        <header className="flex items-center justify-between px-6 py-6 md:px-12">
          <Logo />

          <TransitionLink
            href="/#work"
            className="flex items-center gap-2 text-sm transition-opacity hover:opacity-50"
          >
            <ArrowLeft size={16} />
            All projects
          </TransitionLink>
        </header>

        {/* PROJECT INTRO */}
        <section className="px-6 pb-16 pt-20 md:px-12 md:pb-24 md:pt-28">
          <p className="detail-reveal mb-6 text-xs tracking-[0.2em] text-[#77766f]">
            PROJECT {project.number} / {project.year}
          </p>

          <h1 className="detail-reveal max-w-6xl text-[13vw] font-medium leading-[0.88] tracking-[-0.08em] sm:text-7xl md:text-8xl">
            {project.name}
            <span className="text-[#99988f]">.</span>
          </h1>

          <div className="detail-reveal mt-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <p className="max-w-xl text-base leading-7 text-[#68675f] md:text-lg">
              {project.description}
            </p>

            <span className="text-[10px] tracking-[0.17em] text-[#77766f]">
              {project.type}
            </span>
          </div>
        </section>

        {/* MAIN PROJECT IMAGE */}
        <section className="px-6 md:px-12">
          <div className="detail-image relative aspect-[4/3] overflow-hidden bg-[#e8e6df] md:aspect-[16/8]">
            <Image
              src={project.image}
              alt={`${project.name} website screenshot`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 90vw"
              className="object-cover"
            />
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="grid gap-10 px-6 py-20 md:grid-cols-[1fr_2fr] md:px-12 md:py-28">
          <p className="detail-reveal text-xs tracking-[0.2em] text-[#77766f]">
            THE OVERVIEW
          </p>

          <div className="detail-reveal">
            <h2 className="mb-6 text-3xl tracking-tight md:text-5xl">
              About the project
            </h2>

            <p className="max-w-3xl text-base leading-8 text-[#68675f] md:text-lg">
              {project.overview}
            </p>
          </div>
        </section>

        {/* TECHNOLOGIES */}
        <section className="border-t border-black/10 px-6 py-16 md:px-12 md:py-20">
          <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
            <p className="detail-reveal text-xs tracking-[0.2em] text-[#77766f]">
              TECHNOLOGIES
            </p>

            <div className="detail-reveal flex flex-wrap gap-3">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-black/20 px-5 py-3 text-sm transition-colors duration-300 hover:bg-[#242420] hover:text-white"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="bg-[#eae9e3] px-6 py-20 md:px-12 md:py-28">
          <div className="detail-reveal mb-10">
            <p className="mb-4 text-xs tracking-[0.2em] text-[#77766f]">
              WHAT WENT INTO IT
            </p>

            <h2 className="text-4xl tracking-tight md:text-6xl">
              Key features
              <span className="text-[#99988f]">.</span>
            </h2>
          </div>

          {project.features.map((feature, index) => (
            <div
              key={feature}
              className="detail-reveal grid grid-cols-[40px_1fr] gap-4 border-t border-black/20 py-6 md:grid-cols-[70px_1fr]"
            >
              <span className="pt-1 text-xs text-[#77766f]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="text-xl tracking-tight md:text-3xl">
                {feature}
              </h3>
            </div>
          ))}
        </section>

        {/* NEXT PROJECT */}
        <section className="px-6 py-24 md:px-12 md:py-32">
          <p className="detail-reveal mb-8 text-xs tracking-[0.2em] text-[#77766f]">
            NEXT PROJECT
          </p>

          <TransitionLink
            href={`/work/${nextProject.slug}`}
            className="detail-reveal group flex items-center justify-between gap-5 border-b border-black/20 pb-8"
          >
            <div>
              <p className="mb-3 text-xs text-[#77766f]">
                {nextProject.type}
              </p>

              <h2 className="text-4xl tracking-tight transition-colors duration-300 group-hover:text-[#77766f] sm:text-6xl md:text-8xl">
                {nextProject.name}
              </h2>
            </div>

            <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-black/20 transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={22} />
            </span>
          </TransitionLink>

          <TransitionLink
            href="/#work"
            className="mt-10 inline-flex items-center gap-3 text-sm transition-opacity hover:opacity-50"
          >
            <ArrowLeft size={16} />
            Back to all projects
          </TransitionLink>
        </section>

        {/* FOOTER */}
        <footer className="flex flex-col justify-between gap-4 border-t border-black/15 px-6 py-7 text-xs text-[#77766f] sm:flex-row md:px-12">
          <span>LABIB® — INDEPENDENT DEVELOPER</span>

          <a
            href="mailto:mokidulislam00@gmail.com"
            className="transition-colors hover:text-black"
          >
            LET&apos;S TALK ↗
          </a>
        </footer>
      </main>
    </ProjectDetailsAnimation>
  );
}
