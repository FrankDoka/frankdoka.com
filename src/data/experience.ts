export interface Job {
  slug: string
  org: string
  period: string
  role: string
  location: string
  description: string
  techStack: string[]
  cardHighlights: string[]
  highlights: string[]
}

export const experience: Job[] = [
  {
    slug: 'advantagecare-physicians',
    org: 'AdvantageCare Physicians',
    period: 'Mar 2024 – Present',
    role: 'Infrastructure Architect',
    location: 'Manhattan, NY',
    description:
      'Architecting and managing Azure cloud infrastructure, Microsoft 365 tenant administration, and security operations for a major healthcare provider in a HIPAA-regulated environment. Driving automation, networking, and identity strategy across the organization.',
    techStack: ['Azure', 'Entra ID', 'Defender XDR', 'Microsoft 365', 'PowerShell', 'Azure Firewall', 'Azure Virtual Network', 'Intune', 'SCCM', 'Terraform', 'Conditional Access'],
    cardHighlights: [
      'Azure infrastructure ownership — VMs, networking, firewalls, and automation.',
      'Microsoft 365 tenant administration and Entra ID identity architecture.',
      'Security operations with Defender XDR, Conditional Access, and HIPAA compliance.',
    ],
    highlights: [
      'Architect and manage the Azure environment end-to-end — provisioning and maintaining virtual machines, virtual networks, NSGs, Azure Firewall rules, and resource groups across development and production subscriptions.',
      'Own Microsoft 365 tenant administration including Exchange Online, SharePoint, Teams, and licensing — managing configurations, policies, and service health for the entire organization.',
      'Design and operate the Entra ID identity platform — Conditional Access policies, RBAC role assignments, MFA enforcement, application registrations, and enterprise SSO integrations via SAML and OIDC.',
      'Run security operations through Microsoft Defender XDR — configuring detection rules, investigating alerts, tuning automated response playbooks, and maintaining endpoint protection baselines across the fleet.',
      'Build and maintain Azure networking infrastructure — hub-and-spoke VNet topologies, peering, private endpoints, DNS zones, and firewall policies controlling traffic between on-premises and cloud workloads.',
      'Automate infrastructure provisioning and configuration with PowerShell and Terraform — standing up environments, enforcing compliance baselines, and eliminating manual deployment steps.',
      'Manage hybrid identity synchronization between on-premises Active Directory and Entra ID, ensuring seamless authentication and group-based access controls across cloud and local resources.',
      'Administer SCCM and Intune for endpoint lifecycle management — OS deployment, patching, software distribution, and compliance reporting across thousands of devices in a HIPAA-regulated environment.',
    ],
  },
  {
    slug: 'nyc-department-of-correction',
    org: 'NYC Department of Correction',
    period: 'Nov 2016 – Apr 2022',
    role: 'Senior Systems Administrator',
    location: 'Queens, NY',
    description:
      'Managed infrastructure and identity for one of the largest municipal correctional agencies in the country — supporting tens of thousands of users, maintaining near-perfect patch compliance, and leading a large-scale Windows 11 migration.',
    techStack: ['Active Directory', 'Azure AD', 'SCCM', 'WSUS', 'PowerShell', 'GPO', 'Microsoft 365', 'Windows 11'],
    cardHighlights: [
      'Hybrid AD and Azure AD for 15,000+ users with standardized GPO and identity sync.',
      'SCCM imaging pipelines with PowerShell automation — 40% faster provisioning.',
      '99%+ patch compliance across 8,000+ systems through SCCM and WSUS.',
    ],
    highlights: [
      'Ran hybrid Active Directory and Azure AD environments supporting 15,000+ users, owning GPO architecture, identity sync, and group policy standardization across the agency.',
      'Built and deployed standardized Windows OS images using SCCM task sequences and PowerShell, reducing provisioning time by 40%.',
      'Drove monthly patching operations across 8,000+ systems using SCCM and WSUS, consistently achieving over 99% compliance.',
      'Led a 6,000-device migration to Windows 11 and Azure AD — scoping readiness, coordinating rollout, and validating device compliance at each phase.',
      'Served as Tier-3 escalation point for complex endpoint failures, GPO conflicts, and Microsoft 365 performance issues.',
    ],
  },
  {
    slug: 'nyc-police-department',
    org: 'NYC Police Department',
    period: 'Sep 2015 – May 2016',
    role: 'Desktop Support Technician',
    location: 'Manhattan, NY',
    description:
      'First IT role — hands-on desktop support for the nation\'s largest police department. Imaging, hardware troubleshooting, and field deployments across precincts.',
    techStack: ['Windows', 'Active Directory', 'Desktop Imaging', 'Hardware Troubleshooting'],
    cardHighlights: [
      'Supported 2,500+ systems across precincts with imaging and field service.',
      'Cross-functional troubleshooting with infrastructure, identity, and security teams.',
    ],
    highlights: [
      'Provided front-line support for 2,500+ systems across NYPD precincts — desktop imaging, hardware diagnostics, OS troubleshooting, and on-site field service.',
      'Coordinated with infrastructure, identity management, security, and application teams to resolve complex cross-functional issues.',
      'Built foundational expertise in Active Directory, group policy, and enterprise Windows environments.',
    ],
  },
]
