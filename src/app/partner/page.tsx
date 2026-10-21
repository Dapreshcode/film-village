    "use client";

    import { FormEvent, useState } from "react";
    import Link from "next/link";
  

    type FormData = {
      name: string;
      email: string;
      organization: string;
      enquiryType: string;
      message: string;
    };

    const initialForm: FormData = {
      name: "",
      email: "",
      organization: "",
      enquiryType: "",
      message: "",
    };

    const partnershipAreas = [
      {
        number: "01",
        title: "Strategic Partnerships",
        description:
          "Collaborate on initiatives, programmes and opportunities that contribute to the growth of the creative ecosystem.",
      },
      {
        number: "02",
        title: "Investment",
        description:
          "Explore opportunities to support the development of infrastructure, talent and creative ventures.",
      },
      {
        number: "03",
        title: "Production",
        description:
          "Work with the Village on film, television, digital content and other forms of visual storytelling.",
      },
      {
        number: "04",
        title: "Training & Talent",
        description:
          "Support programmes that create pathways for emerging creatives to learn, practise and build.",
      },
    ];

    const enquiryTypes = [
      "Partnership",
      "Investment",
      "Production",
      "Training",
      "Other",
    ];

    export default function PartnerPage() {

    const [form, setForm] = useState<FormData>(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [website, setWebsite] = useState("");

    async function handleSubmit(
      event: FormEvent<HTMLFormElement>,
    ) {
      event.preventDefault();

      if (isSubmitting) return;

      setIsSubmitting(true);
      setErrorMessage("");

      try {
        const response = await fetch("/api/partner-enquiries", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            website,
          }),
        });

         const result = await response.json().catch(() => ({}));

   if (!response.ok) {
     throw new Error(
       result.message || "Unable to submit your enquiry. Please try again.",
     );
   }

        setForm(initialForm);
        setWebsite("");
        setSubmitted(true);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        );
      } finally {
        setIsSubmitting(false);
      }
    }

    function handleChange(
      field: keyof FormData,
      value: string,
    ) {
      setForm((current) => ({
        ...current,
        [field]: value,
      }));
    }


      return (
        <main className="bg-[var(--cinematic-navy)] text-white">
          {/* HERO */}
          <section className="border-b border-white/10 pt-36 pb-24 md:pt-44 md:pb-32">
            <div className="mx-auto max-w-[1360px] px-6 md:px-8">
              <div className="max-w-5xl">
                <div className="mb-8 flex items-center gap-3">
                  <span className="h-2 w-2 bg-[var(--orange)]" />

                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45 md:text-[11px]">
                    Partner With Us
                  </p>
                </div>

                <h1 className="font-[var(--font-cormorant)] text-6xl font-medium leading-[0.9] tracking-[-0.025em] sm:text-7xl md:text-8xl lg:text-[110px]">
                  Build what&apos;s
                  <br />
                  <span className="text-white/35">possible.</span>
                </h1>

                <p className="mt-8 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
                  Capital Film & Creatives Village is being built through
                  collaboration. We welcome organisations, creatives, investors
                  and partners who believe in the possibilities of African
                  storytelling.
                </p>
              </div>
            </div>
          </section>

          {/* INTRO */}
          <section className="py-24 md:py-32">
            <div className="mx-auto max-w-[1360px] px-6 md:px-8">
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 bg-[var(--orange)]" />

                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                      Collaboration
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-7 lg:col-start-6">
                  <p className="font-[var(--font-cormorant)] text-3xl leading-[1.15] text-white/90 md:text-4xl">
                    A creative ecosystem becomes stronger when people bring
                    different ideas, skills and resources to the same table.
                  </p>

                  <p className="mt-7 max-w-2xl text-sm leading-7 text-white/50 md:text-base">
                    Whether you are interested in production, investment, talent
                    development, technology or strategic collaboration, there are
                    opportunities to contribute to the journey.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* PARTNERSHIP AREAS */}
          <section className="border-t border-white/10 py-24 md:py-32">
            <div className="mx-auto max-w-[1360px] px-6 md:px-8">
              <div className="mb-14">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
                  Ways to Engage
                </p>

                <h2 className="mt-5 max-w-3xl font-[var(--font-cormorant)] text-5xl font-medium leading-[0.95] md:text-7xl">
                  Find your place
                  <br />
                  <span className="text-white/35">in the story.</span>
                </h2>
              </div>

              <div className="grid border-t border-white/10 md:grid-cols-2">
                {partnershipAreas.map((area) => (
                  <div
                    key={area.number}
                    className="border-b border-white/10 py-10 md:px-8 md:py-12 md:odd:border-r md:first:pl-0 md:nth-[2]:pr-0"
                  >
                    <div className="flex items-start justify-between gap-8">
                      <span className="font-[var(--font-cormorant)] text-3xl text-white/20">
                        {area.number}
                      </span>

                      <div className="max-w-md">
                        <h3 className="font-[var(--font-cormorant)] text-3xl font-medium md:text-4xl">
                          {area.title}
                        </h3>

                        <p className="mt-5 text-sm leading-7 text-white/45">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FORM */}
          <section className="border-t border-white/10 bg-[var(--surface)] py-24 md:py-32">
            <div className="mx-auto max-w-[1360px] px-6 md:px-8">
              <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
                {/* FORM INTRO */}
                <div className="lg:col-span-5">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
                    Start a Conversation
                  </p>

                  <h2 className="mt-6 max-w-xl font-[var(--font-cormorant)] text-5xl font-medium leading-[0.95] md:text-7xl">
                    Let&apos;s build
                    <br />
                    <span className="text-white/35">together.</span>
                  </h2>

                  <p className="mt-7 max-w-md text-sm leading-7 text-white/50 md:text-base">
                    Tell us a little about yourself, your organisation and how you
                    would like to engage with Capital Film & Creatives Village.
                  </p>
                </div>

                {/* FORM */}
                <div className="lg:col-span-6 lg:col-start-7">
                  {submitted ? (
                    <div className="border border-white/10 p-8 md:p-12">
                      <span className="text-[var(--orange)]">✓</span>

                      <h3 className="mt-6 font-[var(--font-cormorant)] text-4xl">
                        Thank you.
                      </h3>

                      <p className="mt-4 max-w-md text-sm leading-7 text-white/50">
                        Your enquiry has been received. We'll be in touch as
                        soon as possible.
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          setForm(initialForm);
                          setSubmitted(false);
                        }}
                        className="mt-8 border-b border-white/30 pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors hover:border-[var(--orange)] hover:text-[var(--orange)]"
                      >
                        Send another enquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid gap-8 md:grid-cols-2">
                        {/*hidden span protection field for bots*/}
                        
                                  <div
                                    aria-hidden="true"
                                    className="absolute h-px w-px overflow-hidden"
                                  >
                                    <label htmlFor="website">
                                      Leave this field empty
                                    </label>
                                    <input
                                      id="website"
                                      name="website"
                                      type="text"
                                      tabIndex={-1}
                                      autoComplete="off"
                                      value={website}
                                      onChange={(event) => setWebsite(event.target.value)}
                                    />
                                  </div>

                        
                        <div>
                          <label
                            htmlFor="name"
                            className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45"
                          >
                            Name
                          </label>

                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={form.name}
                            onChange={(event) =>
                              handleChange("name", event.target.value)
                            }
                            className="mt-3 w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[var(--orange)]"
                            placeholder="Your name"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45"
                          >
                            Email
                          </label>

                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={(event) =>
                              handleChange("email", event.target.value)
                            }
                            className="mt-3 w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[var(--orange)]"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="organization"
                          className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45"
                        >
                          Organisation
                          <span className="ml-2 normal-case tracking-normal text-white/20">
                            Optional
                          </span>
                        </label>

                        <input
                          id="organization"
                          name="organization"
                          type="text"
                          value={form.organization}
                          onChange={(event) =>
                            handleChange("organization", event.target.value)
                          }
                          className="mt-3 w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[var(--orange)]"
                          placeholder="Company or organisation"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="enquiryType"
                          className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45"
                        >
                          Enquiry Type
                        </label>

                        <select
                          id="enquiryType"
                          name="enquiryType"
                          required
                          value={form.enquiryType}
                          onChange={(event) =>
                            handleChange("enquiryType", event.target.value)
                          }
                          className="mt-3 w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none focus:border-[var(--orange)]"
                        >
                          <option value="" disabled className="bg-[#080D1C]">
                            Select an option
                          </option>

                          {enquiryTypes.map((type) => (
                            <option
                              key={type}
                              value={type}
                              className="bg-[#080D1C]"
                            >
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45"
                        >
                          Message
                        </label>

                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={form.message}
                          onChange={(event) =>
                            handleChange("message", event.target.value)
                          }
                          className="mt-3 w-full resize-none border-b border-white/15 bg-transparent px-0 py-3 text-sm leading-7 text-white outline-none transition-colors placeholder:text-white/20 focus:border-[var(--orange)]"
                          placeholder="Tell us how you would like to work with us..."
                        />
                      </div>

                      {/* ERROR MESSAGE */}
                    {errorMessage && (
                      <p
                        role="alert"
                        className="text-sm leading-6 text-red-400"
                      >
                        {errorMessage}
                      </p>
                    )}


                    {/* SUBMIT BUTTON */} 
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center border border-white/20 px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 hover:border-[var(--orange)] hover:text-[var(--orange)] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending..." : "Send Enquiry"}
                      {!isSubmitting && <span className="ml-4">→</span>}
                    </button>

                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* CONTACT FALLBACK */}
          <section className="border-t border-white/10 py-20">
            <div className="mx-auto max-w-[1360px] px-6 md:px-8">
              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">
                    Prefer a direct conversation?
                  </p>

                  <h2 className="mt-3 font-[var(--font-cormorant)] text-3xl md:text-4xl">
                    We&apos;re open to the conversation.
                  </h2>
                </div>

                <Link
                  href="/about"
                  className="inline-flex w-fit items-center border-b border-white/30 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 hover:border-[var(--orange)] hover:text-[var(--orange)]"
                >
                  Learn More About CFCV
                  <span className="ml-3">→</span>
                </Link>
              </div>
            </div>
          </section>
        </main>
      );
    }