import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const {userId} = await auth();

  if(userId) {
    redirect("/dashboard");
  }
  return (
    <main className="min-h-screen bg-background px-4 py-20 flex flex-col items-center justify-start text-center">
      <section className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Budget Tracker
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground">
          Take control of your personal finances with ease. Track your income, expenses,
          bills, and savings—all in one powerful and simple dashboard.
        </p>
        <Button asChild size="lg" className="mt-6 cursor-pointer">
          <SignInButton>Start Tracking Now</SignInButton>
        </Button>
        <div className="mt-12">
          <Image
            src="/og_image.png"
            alt="Budget Tracker overview"
            width={1200}
            height={630}
            className="rounded-xl shadow-xl border"
            priority
          />
        </div>
      </section>

      <section className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl w-full">
        <Feature
          title="Smart Monthly Overview"
          description="Visualize your budget month by month. Understand where your money goes and how you can improve."
        />
        <Feature
          title="Dynamic Categories"
          description="Create custom income, bills, and expense categories. Tailor your budget to match your real lifestyle."
        />
        <Feature
          title="Live Updates"
          description="Every entry you make updates your budget in real time. No reloads. No delays. Just instant feedback."
        />
        <Feature
          title="Visual Insights"
          description="Gain meaningful insights from charts and graphs powered by your monthly data. Simple and intuitive."
        />
      </section>
    </main>
  );
}

function Feature({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center p-6 bg-card rounded-lg shadow hover:shadow-lg transition-shadow">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
