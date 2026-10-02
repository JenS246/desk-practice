const DESK_PASSAGES = [
  {
    id: "client-note-01",
    type: "CLIENT NOTE",
    text: "Marisol Vega called at 9:20 a.m. to confirm her intake appointment for Thursday, March 14. She will bring the lease, photographs of the damaged ceiling, and copies of the three emails she sent to the property manager. Ms. Vega asked whether her adult son may attend. I explained that the attorney will decide who should be present for any confidential discussion. No legal advice was provided during the call."
  },
  {
    id: "client-note-02",
    type: "CLIENT NOTE",
    text: "Darius Coleman reported that he received a certified letter from his former employer yesterday. The envelope is postmarked May 6, and the letter requests the return of a company laptop within ten days. Mr. Coleman believes the laptop was already delivered by courier. He will send the tracking receipt before 4:00 p.m. I added the letter and delivery issue to the attorney's review list."
  },
  {
    id: "client-note-03",
    type: "CLIENT NOTE",
    text: "Nora Patel left a message about her mother's estate. The bank requested a certified copy of the order appointing Ms. Patel as personal representative, which is the person authorized to manage estate property. She has one court-certified copy in her file and asked whether the office needs it first. I returned the call, requested a scanned copy for review, and made no recommendation about sending the original."
  },
  {
    id: "client-note-04",
    type: "CLIENT NOTE",
    text: "Elliot Barnes called regarding Saturday parenting time. He said the usual exchange location is closed for construction and asked where the exchange should occur instead. I reviewed the file and found no alternate location in the current order. I told Mr. Barnes that I would send his question to the supervising attorney. I also noted that the next scheduled exchange begins at 10:00 a.m."
  },
  {
    id: "client-note-05",
    type: "CLIENT NOTE",
    text: "Linh Tran arrived with two folders of medical bills from the January 18 collision. The bills appear to include duplicate statements from the same imaging center. I placed the originals in chronological order and made working copies. Ms. Tran identified one additional provider, Westview Physical Therapy, whose statements were not included. She signed an authorization so the office may request those records and billing statements."
  },
  {
    id: "intake-note-01",
    type: "INTAKE NOTE",
    text: "Prospective client: Aaron Whitfield. Matter: residential security deposit. Mr. Whitfield moved out of 214 Cedar Lane on August 31 and provided a forwarding address by email. He received a check for $625, although the original deposit was $1,400. The landlord enclosed an itemized list that included carpet cleaning and repainting. Mr. Whitfield has move-in photographs, move-out photographs, and the final inspection form."
  },
  {
    id: "intake-note-02",
    type: "INTAKE NOTE",
    text: "Prospective client: Keisha Monroe. Matter: unpaid wages. Ms. Monroe worked as an office coordinator from February 2022 through November 2024. She states that her final paycheck did not include 18 hours of approved overtime. She has pay stubs, timekeeping screenshots, and a text message from her supervisor. The employer has not filed suit. No deadline was calculated during the intake call."
  },
  {
    id: "intake-note-03",
    type: "INTAKE NOTE",
    text: "Prospective client: Samuel Ortiz. Matter: automobile collision. The incident occurred near Pine Street and Route 16 at approximately 7:45 a.m. on June 3. Police responded, but Mr. Ortiz does not yet have the report number. His vehicle was towed to North County Storage. He received emergency treatment the same day and has a follow-up appointment next week. The other driver's insurer has called twice."
  },
  {
    id: "intake-note-04",
    type: "INTAKE NOTE",
    text: "Prospective client: Brianna Ellis. Matter: name change after divorce. The final judgment was entered last month and permits Ms. Ellis to resume her prior surname. She wants certified copies for the Social Security Administration, motor vehicle agency, and her bank. I explained that a certified copy bears the clerk's official seal. The attorney will review the judgment before the office requests additional copies from the court."
  },
  {
    id: "intake-note-05",
    type: "INTAKE NOTE",
    text: "Prospective client: Gregory Hale. Matter: small business lease. Mr. Hale operates a bicycle repair shop and received a proposed five-year renewal. The new rent is $3,250 per month and increases by three percent each year. The proposal also assigns roof maintenance to the tenant. Mr. Hale has not signed it. He will email the current lease, the renewal proposal, and recent correspondence with the owner."
  },
  {
    id: "office-note-01",
    type: "OFFICE NOTE",
    text: "Please prepare the Rivera file for tomorrow's deposition. A deposition is sworn testimony taken before trial. Place the notice first, followed by the amended notice, correspondence about scheduling, and the exhibit list. Confirm that the conference room is reserved from 8:30 a.m. until noon. Do not mark the original photographs. Use copies for the witness exhibit set and keep the originals in the evidence folder."
  },
  {
    id: "office-note-02",
    type: "OFFICE NOTE",
    text: "The signed settlement agreement in Brooks v. Calder arrived by overnight mail. Scan the complete document in color, including the signature pages, and save it to the settlement folder. Compare the scan with the original before filing. The original should remain in the locked cabinet. Send the attorney a message when the scan is available, but do not distribute the agreement to anyone outside the assigned case team."
  },
  {
    id: "office-note-03",
    type: "OFFICE NOTE",
    text: "Before closing the Nguyen matter, confirm that the client received the final letter and all original documents. The file inventory should list the recorded deed, title policy, survey, and paid invoice. Move duplicate drafts to the closed-file archive, but preserve the signed versions. Add the destruction-review date required by the firm's retention policy. Ask the records manager if any document category is unclear."
  },
  {
    id: "office-note-04",
    type: "OFFICE NOTE",
    text: "The attorney needs a clean chronology for the Morrison hearing. Use the emails, payroll records, and calendar entries already in the file. Each line should identify the date, the event, and the supporting document. If two records conflict, list both statements and flag the conflict for review. Do not choose which version is correct. Finish the draft chronology by 2:00 p.m. on Wednesday."
  },
  {
    id: "office-note-05",
    type: "OFFICE NOTE",
    text: "A courier will pick up the probate filing at 3:15 p.m. The packet should contain the original petition, the proposed order, two copies, and the filing check. Verify every signature and compare the caption on each document. The caption is the heading that identifies the court, parties, and case number. Place the documents in a sealed envelope addressed to the county surrogate's office."
  },
  {
    id: "email-draft-01",
    type: "EMAIL DRAFT",
    text: "Subject: Documents for Friday's meeting\n\nMs. Okafor,\n\nThank you for speaking with our office today. Before Friday's meeting, please send the signed contract, the April 2 invoice, and any messages concerning delivery. PDF copies are preferred, but clear photographs are acceptable if scanning is not available. Please keep the original documents in a safe place. We will confirm receipt after the files are added to your matter."
  },
  {
    id: "email-draft-02",
    type: "EMAIL DRAFT",
    text: "Subject: Updated hearing date\n\nMr. Salazar,\n\nThe court has moved the status hearing from September 9 to September 23 at 11:00 a.m. The hearing will remain in Courtroom 4B. Please update your calendar and arrive thirty minutes early for security screening. Our office will contact you if the court issues further instructions. A copy of the scheduling notice is attached for your records."
  },
  {
    id: "email-draft-03",
    type: "EMAIL DRAFT",
    text: "Subject: Request for employment records\n\nMs. Cho,\n\nWe are updating our file before your attorney conference. Please provide your most recent pay stub, the employee handbook you received at hiring, and any written performance reviews from the past two years. If a document is not available, simply identify it in your reply. Do not use your work email account to send confidential information to this office."
  },
  {
    id: "email-draft-04",
    type: "EMAIL DRAFT",
    text: "Subject: Inspection access\n\nCounsel,\n\nOur client can provide access to the property on Tuesday, October 8, between 9:00 a.m. and 1:00 p.m. Please confirm the expected arrival time and the names of all attendees. The inspection should be limited to the areas identified in your letter dated September 26. Kindly advise whether your expert intends to bring testing equipment or remove any sample material."
  },
  {
    id: "email-draft-05",
    type: "EMAIL DRAFT",
    text: "Subject: Confirmation of payment\n\nMr. Bell,\n\nThis message confirms that our office received your payment of $875 on January 12. The amount has been applied to invoice 24-107. Your current statement will be mailed separately. Please contact the billing coordinator if your address has changed or if the statement does not arrive within seven business days. This email concerns account administration and does not request additional payment."
  },
  {
    id: "letter-01",
    type: "LETTER",
    text: "Dear Ms. Reynolds:\n\nEnclosed is a copy of the deed recorded on February 7 in Book 9182, Page 44. The recorder's stamp appears in the upper right corner of the first page. Please review the spelling of the owners' names and the property address. Keep this copy with your permanent records. If you notice a clerical error, contact our office so the recorded document can be reviewed promptly."
  },
  {
    id: "letter-02",
    type: "LETTER",
    text: "Dear Mr. Fields:\n\nWe acknowledge receipt of your letter dated July 15 concerning the fence between 88 Maple Avenue and 90 Maple Avenue. Our client is reviewing the survey and the photographs enclosed with your letter. Nothing in this response should be understood as an agreement about the boundary line. We expect to provide a substantive response after the available property records have been examined."
  },
  {
    id: "letter-03",
    type: "LETTER",
    text: "Dear Records Custodian:\n\nPlease provide a certified copy of the incident report concerning the event at 410 West Market Street on November 2. The reported time was approximately 6:35 p.m. Our client's signed authorization is enclosed. If a fee is required, please send an invoice before processing the request. You may deliver the records by secure electronic link or by mail to the address listed above."
  },
  {
    id: "letter-04",
    type: "LETTER",
    text: "Dear Ms. Ibrahim:\n\nYour estate-planning documents are ready for review. The enclosed drafts include a will, financial power of attorney, and health care directive. These are review copies only and should not be signed. Please mark any corrections to names, addresses, or family information and return the pages in the provided envelope. The office will schedule a signing appointment after the attorney approves all revisions."
  },
  {
    id: "letter-05",
    type: "LETTER",
    text: "Dear Counsel:\n\nEnclosed are our client's responses to the first request for production. The production contains documents labeled RIVERA 0001 through RIVERA 0148. A production number allows each page to be identified later. Please advise within five business days if any file cannot be opened. Our client reserves all objections stated in the written responses, including objections concerning relevance and confidential information."
  },
  {
    id: "case-summary-01",
    type: "CASE SUMMARY",
    text: "The tenant rented a second-floor apartment beginning in June 2023. After a winter storm, water entered through the bedroom ceiling. The tenant reported the leak twice and moved her bed to another room. The landlord arranged a roof inspection but did not repair the interior damage for six weeks. The dispute concerns the condition of the apartment, the timing of the response, and the amount withheld from the security deposit."
  },
  {
    id: "case-summary-02",
    type: "CASE SUMMARY",
    text: "The employee worked for the restaurant for fourteen months and regularly closed the dining room. He alleges that managers required staff to complete cleaning duties after clocking out. The employer denies that instruction and points to a written policy prohibiting unpaid work. Relevant evidence includes time records, closing checklists, schedule changes, and messages among the evening staff. Three former employees may have knowledge of the closing procedure."
  },
  {
    id: "case-summary-03",
    type: "CASE SUMMARY",
    text: "The buyer signed a contract to purchase a vacant lot for $82,000. The contract allowed ten days for review of title records. During that period, a survey showed that a neighboring garage extends two feet across the boundary. The buyer requested additional time to investigate. The seller declined and kept the deposit after the closing did not occur. The parties dispute whether the title-review clause permitted cancellation."
  },
  {
    id: "case-summary-04",
    type: "CASE SUMMARY",
    text: "Police stopped the defendant's vehicle after an officer observed a broken rear light. During the stop, the officer learned that the driver's license was suspended. The vehicle was impounded under department policy, and an inventory search found a sealed envelope beneath the passenger seat. The defense challenges the search. The prosecution argues that officers followed a standard process for listing property in an impounded vehicle."
  },
  {
    id: "case-summary-05",
    type: "CASE SUMMARY",
    text: "Two sisters are co-beneficiaries of a trust created by their father. The trustee sold a small commercial property and distributed part of the proceeds. One beneficiary requested the closing statement, repair invoices, and an accounting of the remaining funds. An accounting is a report showing money received, spent, and held. The trustee produced several records but has not provided statements for one of the trust accounts."
  },
  {
    id: "procedural-summary-01",
    type: "PROCEDURAL SUMMARY",
    text: "The complaint was filed on January 8, and the defendant was served on January 13. Counsel appeared for the defendant and requested additional time to respond. The court granted the request, making the new response date February 24. The defendant then filed an answer denying liability and asserting three affirmative defenses. An affirmative defense is a stated reason the defendant may avoid liability even if some allegations are true."
  },
  {
    id: "procedural-summary-02",
    type: "PROCEDURAL SUMMARY",
    text: "After the agency denied the permit, the applicant requested an administrative hearing. Both sides submitted exhibits and witness lists before the hearing date. The hearing officer received testimony over two days and issued a written recommendation. The agency adopted that recommendation in its final decision. The applicant then filed a timely petition asking the court to review whether the agency followed the law and relied on sufficient evidence."
  },
  {
    id: "procedural-summary-03",
    type: "PROCEDURAL SUMMARY",
    text: "The plaintiff moved for summary judgment after discovery closed. Summary judgment allows a court to decide a claim without a trial when no material fact is genuinely disputed. The defendant filed an opposition supported by a declaration and four exhibits. The court heard argument, denied the motion, and set a pretrial conference. The denial means the disputed issues will continue toward trial unless the case resolves."
  },
  {
    id: "procedural-summary-04",
    type: "PROCEDURAL SUMMARY",
    text: "The probate court admitted the will and appointed Leah Morgan as executor. An executor is the person authorized to administer an estate under the will. Notice was sent to the listed beneficiaries and published as required. Two creditors submitted claims during the allowed period. The executor approved one claim and disputed the other. The court scheduled a hearing limited to the disputed claim and requested supporting invoices."
  },
  {
    id: "procedural-summary-05",
    type: "PROCEDURAL SUMMARY",
    text: "The parties attended mediation on April 11 and reached agreement on all parenting issues. Mediation is a confidential process in which a neutral person helps the parties seek resolution. Counsel prepared a consent order reflecting the agreement. Both parties signed after reviewing the terms. The judge entered the order on April 18, making the agreed schedule enforceable. Financial claims remain pending and are set for a separate conference."
  },
  {
    id: "docket-entry-01",
    type: "DOCKET ENTRY",
    text: "05/14/2026 - Notice of appearance filed on behalf of defendant Lakeview Transit, Inc. Attorney Simone Price added as counsel of record. Defendant's unopposed motion for a fourteen-day extension is granted. Answer or other response is due May 30, 2026. The initial scheduling conference remains set for June 12, 2026, at 10:30 a.m. by video. Connection instructions will be issued separately."
  },
  {
    id: "docket-entry-02",
    type: "DOCKET ENTRY",
    text: "09/03/2026 - Plaintiff's motion to compel discovery received and entered. Opposition, if any, is due September 17, 2026. Reply is due September 24, 2026. The motion will be decided on the papers unless the court schedules oral argument. The parties must continue to confer in good faith about the disputed requests. Filing the motion does not suspend any other deadline in the scheduling order."
  },
  {
    id: "docket-entry-03",
    type: "DOCKET ENTRY",
    text: "11/21/2026 - Status conference held before Judge Elena Cruz. Counsel for all parties appeared. The court reviewed the remaining depositions and expert disclosure dates. By agreement, fact discovery is extended through January 16, 2027. No other deadline is changed. A further status conference is set for January 22, 2027, at 2:00 p.m. Each side shall file a one-page update two business days beforehand."
  },
  {
    id: "docket-entry-04",
    type: "DOCKET ENTRY",
    text: "02/06/2026 - Petition for guardianship filed with supporting physician statement. Temporary relief was not requested. The clerk issued notice for service on the proposed protected person and the relatives identified in the petition. Proof of service must be filed before the hearing. Hearing scheduled for March 5, 2026, at 9:00 a.m. in Room 215. The petitioner must bring the original physician statement."
  },
  {
    id: "docket-entry-05",
    type: "DOCKET ENTRY",
    text: "07/28/2026 - Joint stipulation of dismissal filed. A stipulation is a written agreement between the parties. The filing states that all claims have been resolved and that each party will bear its own costs. Because the stipulation is signed by all appearing parties, the action is dismissed with prejudice. A dismissal with prejudice prevents the same claims from being filed again. The clerk shall close the case."
  },
  {
    id: "memo-01",
    type: "MEMO",
    text: "Issue: Whether the notice was sent to the address required by the contract. The agreement states that formal notice must be delivered to the business address listed on page twelve, unless a party provides a replacement address in writing. The file contains an email announcing the company's move, but the email does not expressly change the notice address. Further research should examine whether the email satisfied the contract's written-notice requirement."
  },
  {
    id: "memo-02",
    type: "MEMO",
    text: "The lease defines ordinary maintenance as work costing less than $500 per item. Structural repairs remain the owner's responsibility regardless of cost. The disputed invoice is for $1,860 and describes replacement of a damaged support beam. On its face, the work appears structural and exceeds the maintenance threshold. The photographs and contractor's report should be reviewed before reaching a conclusion about responsibility under the lease."
  },
  {
    id: "memo-03",
    type: "MEMO",
    text: "A privilege log identifies documents withheld because they may contain protected attorney-client communications or attorney work product. The log should provide enough information to evaluate the claim without revealing the protected substance. For each withheld email, list the date, sender, recipients, general subject, and privilege asserted. Confirm that every listed recipient had a role related to the legal advice. Flag messages copied to outside consultants for attorney review."
  },
  {
    id: "memo-04",
    type: "MEMO",
    text: "The employee handbook states that complaints may be submitted to a supervisor, human resources, or the compliance hotline. Ms. Jenkins emailed her supervisor on March 2 and contacted human resources on March 8. Her performance warning was issued on March 19. The timing does not by itself establish retaliation, but it is relevant to the sequence of events. Witness interviews may clarify who knew about each complaint."
  },
  {
    id: "memo-05",
    type: "MEMO",
    text: "The deed describes a twelve-foot access easement along the eastern boundary. An easement permits specified use of land owned by someone else. Here, the stated purpose is vehicle access to the rear parcel. The current dispute concerns a locked gate installed across the route. The title documents do not state who may maintain a gate. Older surveys and prior-owner correspondence may help explain the historical use."
  },
  {
    id: "research-note-01",
    type: "RESEARCH NOTE",
    text: "Research question: When may a court excuse late service of a complaint? Start with the current civil rule governing time for service. Then locate controlling appellate decisions discussing good cause and discretionary extensions. Record the facts that courts considered important, including attempts at service, notice to the defendant, prejudice, and the length of delay. Confirm that each case remains valid before adding it to the research summary."
  },
  {
    id: "research-note-02",
    type: "RESEARCH NOTE",
    text: "Research question: Does a handwritten amendment change a printed will? Review the state's statute on will execution and later alterations. Search for cases involving words added after the original signing. Note whether the added language was signed, witnessed, or dated. Distinguish between a valid codicil, which formally amends a will, and an informal note that may have no legal effect. Check all citations against an official source."
  },
  {
    id: "research-note-03",
    type: "RESEARCH NOTE",
    text: "Research question: What records may a tenant inspect before challenging utility charges? Examine the local housing code, the lease, and any regulation governing shared meters. Identify whether the owner must provide bills, calculations, or meter readings. Note the time allowed for a response and any required form of request. The final summary should separate legal requirements from practical suggestions and should not assume facts missing from the file."
  },
  {
    id: "research-note-04",
    type: "RESEARCH NOTE",
    text: "Research question: Can an agency consider an application that omits a required attachment? Locate the governing regulation and the agency's published filing instructions. Determine whether an incomplete application is rejected, held open for correction, or treated as filed on the later completion date. Search administrative decisions for similar omissions. Save copies of all cited materials and include the date each online source was last checked."
  },
  {
    id: "research-note-05",
    type: "RESEARCH NOTE",
    text: "Research question: What is required to authenticate a photograph at trial? Authentication means showing that an item is what its proponent claims it to be. Begin with the evidence rule and its official comment. Find cases involving a witness who recognized the place or event shown. Note whether the photographer had to testify. Avoid relying on cases that concern altered digital images unless the distinction is explained."
  },
  {
    id: "calendar-note-01",
    type: "CALENDAR NOTE",
    text: "Complaint served: Monday, April 6. Response period: 21 days after service. Preliminary calculation places the response on Monday, April 27. Confirm the governing rule, count every calendar day, and check whether the final day is a court holiday. Enter the date as tentative until an attorney approves it. Add reminders at fourteen days, seven days, and two business days before the approved deadline."
  },
  {
    id: "calendar-note-02",
    type: "CALENDAR NOTE",
    text: "Expert inspection: 1250 Harbor Road, Suite 300, on Friday, June 19, at 1:30 p.m. Building security requires photo identification and a visitor list 48 hours in advance. Confirm attendance for Dr. Watanabe, counsel, the property manager, and the court reporter. Reserve two hours. Send a reminder that parking is available in the south garage and that no equipment may be left overnight."
  },
  {
    id: "calendar-note-03",
    type: "CALENDAR NOTE",
    text: "Probate inventory due ninety days after appointment of the executor. Appointment date: August 12. Calculate the date under the probate rule and verify whether filing is electronic or in person. The inventory should list estate assets and their estimated values as of the date of death. Set an internal draft deadline two weeks earlier so the attorney and executor have time to review all entries."
  },
  {
    id: "calendar-note-04",
    type: "CALENDAR NOTE",
    text: "Mediation is set for December 4 from 9:00 a.m. to 4:00 p.m. by secure video conference. Confidential statements are due directly to the mediator seven days beforehand and should not be filed with the court. Confirm the page limit and delivery instructions. Calendar a client preparation call for the prior week. Send the final connection link only through the approved client portal."
  },
  {
    id: "calendar-note-05",
    type: "CALENDAR NOTE",
    text: "The zoning board hearing begins at 6:30 p.m. on October 20 in the municipal meeting room. The exhibit packet must reach the board secretary by noon on October 13. Prepare one searchable PDF and eight paper copies unless the secretary approves electronic copies only. Confirm that the site plan is legible at full page size. Schedule final attorney review for October 9."
  },
  {
    id: "court-opinion-01",
    type: "COURT OPINION",
    text: "The court does not decide which witness gave the more convincing account. That task belongs to the fact finder at trial. At this stage, the question is narrower: whether the record contains a genuine dispute about a fact that could affect the outcome. The two witnesses described the intersection differently, and the photographs do not resolve that disagreement. Summary judgment is therefore not appropriate on the present record."
  },
  {
    id: "court-opinion-02",
    type: "COURT OPINION",
    text: "A filing deadline promotes orderly procedure, but the rule also permits an extension when a party shows good cause. Counsel requested additional time before the deadline expired, explained the unexpected medical absence, and proposed a short extension. The opposing party identified no specific prejudice. Under these circumstances, the trial court acted within its discretion when it allowed the response to be filed five days late."
  },
  {
    id: "court-opinion-03",
    type: "COURT OPINION",
    text: "The lease must be read as a whole. One paragraph requires the tenant to perform routine upkeep, while another assigns structural repairs to the owner. Reading the upkeep clause to include replacement of a load-bearing beam would leave the structural-repair clause with little work to do. The more reasonable reading gives effect to both provisions. The owner was responsible for the beam replacement described in the invoice."
  },
  {
    id: "court-opinion-04",
    type: "COURT OPINION",
    text: "The agency was entitled to rely on the inspector's observations, which were recorded in a dated report and supported by photographs. The applicant received the report before the hearing, questioned the inspector, and submitted contrary evidence. Due process required a meaningful opportunity to respond, not acceptance of the applicant's position. Because that opportunity was provided, the procedure used at the hearing was adequate."
  },
  {
    id: "court-opinion-05",
    type: "COURT OPINION",
    text: "The child's school schedule, medical appointments, and established relationship with each parent were addressed in the hearing record. The judge explained how the revised schedule would reduce midweek travel while preserving substantial time in both homes. Our review is limited. We do not replace the trial judge's reasonable assessment merely because another schedule was possible. The order is supported by the evidence and is affirmed."
  },
  {
    id: "litigation-note-01",
    type: "LITIGATION NOTE",
    text: "Discovery responses arrived by secure link at 4:42 p.m. The folder contains written answers, 212 pages of documents, and three short video files. Save the original download without changing file names. Create a separate working copy for review. The written answers refer to a maintenance log, but no document with that title appears in the production. Add the missing log to the follow-up list for counsel."
  },
  {
    id: "real-estate-note-01",
    type: "CLOSING NOTE",
    text: "Closing is scheduled for 10:00 a.m. on May 22. The final walk-through will occur at 8:30 a.m. that morning. The buyer must bring government-issued identification and wire the required funds using instructions confirmed by telephone. Never rely on wiring instructions sent only by email. The seller will deliver two keys, the garage remote, and receipts for the agreed plumbing repair."
  },
  {
    id: "estate-note-01",
    type: "ESTATE NOTE",
    text: "The decedent's safe-deposit box was opened in the presence of the bank officer and the appointed executor. The box contained an original will, two savings bonds, a watch, and a sealed envelope labeled tax records. Each item was listed on the bank's inventory form. The executor removed the will for filing and left the remaining property in the box pending instructions from the estate attorney."
  },
  {
    id: "family-note-01",
    type: "FAMILY LAW NOTE",
    text: "The current parenting order provides for video calls on Tuesdays and Thursdays at 7:00 p.m. The client reports that three recent calls began more than twenty minutes late. She saved screenshots showing the call times. Ask her to provide the complete call log, not selected entries, and to continue following the existing order. The attorney will review whether any further action is appropriate."
  },
  {
    id: "employment-note-01",
    type: "EMPLOYMENT NOTE",
    text: "Human resources produced the employee's personnel file in response to the signed authorization. The file includes the application, offer letter, handbook acknowledgment, annual reviews, and separation notice. It does not include the attendance spreadsheet mentioned in the separation notice. Compare the page count with the cover letter, preserve the production as received, and ask counsel whether to request the referenced spreadsheet separately."
  },
  {
    id: "criminal-note-01",
    type: "CASE NOTE",
    text: "The arraignment concluded at 10:18 a.m. At an arraignment, the court states the charge and addresses the defendant's plea and release conditions. The defendant entered a plea of not guilty. The judge continued the existing release conditions and scheduled a pretrial conference for August 7. Discovery will be provided through the prosecutor's portal. Counsel requested preservation of available body-camera recordings."
  },
  {
    id: "admin-note-01",
    type: "AGENCY NOTE",
    text: "The licensing division issued a notice of deficiency rather than a final denial. A deficiency notice identifies information that is missing or incomplete. The applicant has until March 28 to submit a revised floor plan and proof of insurance. If the response is timely, the division will continue its review under the original application number. Calendar the date and confirm the required file format with the assigned reviewer."
  }
];
