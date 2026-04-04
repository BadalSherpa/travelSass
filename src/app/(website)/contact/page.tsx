import InquiryForm from '@/components/website/InquiryForm'

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900">Contact Us</h1>
      <p className="mt-3 text-slate-600">
        Reach out for package details, custom trips, or partnership inquiries.
      </p>

      <div className="mt-8">
        <InquiryForm heading="Send a General Inquiry" />
      </div>
    </section>
  )
}