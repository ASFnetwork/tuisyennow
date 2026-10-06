import { getAccessToken } from './googleAuth';

export interface GoogleContact {
  resourceName: string;
  etag?: string;
  displayName: string;
  givenName?: string;
  familyName?: string;
  emails: string[];
  phoneNumbers: string[];
  photoUrl?: string;
  organization?: string;
  jobTitle?: string;
  isOtherContact?: boolean;
}

const PEOPLE_API_BASE = 'https://people.googleapis.com/v1';

export async function fetchUserContacts(): Promise<GoogleContact[]> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Tiada token akses Google. Sila log masuk dengan Google.');
  }

  const url = `${PEOPLE_API_BASE}/people/me/connections?personFields=names,emailAddresses,phoneNumbers,photos,organizations,userDefined&pageSize=150&sortOrder=FIRST_NAME_ASCENDING`;
  
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Ralat API (${res.status}): Gagal memuatkan senarai kenalan Google.`);
  }

  const data = await res.json();
  const connections = data.connections || [];

  return connections.map((person: any): GoogleContact => {
    const primaryName = person.names?.[0];
    const emails = (person.emailAddresses || []).map((e: any) => e.value).filter(Boolean);
    const phoneNumbers = (person.phoneNumbers || []).map((p: any) => p.value).filter(Boolean);
    const photoUrl = person.photos?.[0]?.url;
    const org = person.organizations?.[0];

    return {
      resourceName: person.resourceName,
      etag: person.etag,
      displayName: primaryName?.displayName || emails[0] || phoneNumbers[0] || 'Tanpa Nama',
      givenName: primaryName?.givenName,
      familyName: primaryName?.familyName,
      emails,
      phoneNumbers,
      photoUrl,
      organization: org?.name,
      jobTitle: org?.title,
      isOtherContact: false,
    };
  });
}

export async function fetchOtherContacts(): Promise<GoogleContact[]> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Tiada token akses Google. Sila log masuk dengan Google.');
  }

  const url = `${PEOPLE_API_BASE}/otherContacts?readMask=names,emailAddresses,phoneNumbers&pageSize=100`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    // Other contacts might not always be enabled or may be empty, handle gracefully
    return [];
  }

  const data = await res.json();
  const otherContacts = data.otherContacts || [];

  return otherContacts.map((item: any): GoogleContact => {
    const primaryName = item.names?.[0];
    const emails = (item.emailAddresses || []).map((e: any) => e.value).filter(Boolean);
    const phoneNumbers = (item.phoneNumbers || []).map((p: any) => p.value).filter(Boolean);

    return {
      resourceName: item.resourceName,
      etag: item.etag,
      displayName: primaryName?.displayName || emails[0] || phoneNumbers[0] || 'Kenalan Lain',
      givenName: primaryName?.givenName,
      familyName: primaryName?.familyName,
      emails,
      phoneNumbers,
      isOtherContact: true,
    };
  });
}

export async function createGoogleContact(params: {
  givenName: string;
  familyName?: string;
  phoneNumber?: string;
  email?: string;
  organization?: string;
  notes?: string;
}): Promise<GoogleContact> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Tiada token akses Google. Sila log masuk dengan Google.');
  }

  const personPayload: any = {
    names: [
      {
        givenName: params.givenName,
        familyName: params.familyName || '',
      },
    ],
  };

  if (params.phoneNumber) {
    personPayload.phoneNumbers = [
      {
        value: params.phoneNumber,
        type: 'mobile',
      },
    ];
  }

  if (params.email) {
    personPayload.emailAddresses = [
      {
        value: params.email,
        type: 'home',
      },
    ];
  }

  if (params.organization || params.notes) {
    personPayload.organizations = [
      {
        name: params.organization || 'Pusat Tuisyen Didik',
        title: params.notes || 'Ibu Bapa / Penjaga',
      },
    ];
  }

  const res = await fetch(`${PEOPLE_API_BASE}/people:createContact`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(personPayload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Gagal mencipta kenalan baru di Google Contacts.');
  }

  const person = await res.json();
  const primaryName = person.names?.[0];
  return {
    resourceName: person.resourceName,
    etag: person.etag,
    displayName: primaryName?.displayName || params.givenName,
    givenName: primaryName?.givenName,
    familyName: primaryName?.familyName,
    emails: (person.emailAddresses || []).map((e: any) => e.value),
    phoneNumbers: (person.phoneNumbers || []).map((p: any) => p.value),
    isOtherContact: false,
  };
}

export async function deleteGoogleContact(resourceName: string): Promise<boolean> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Tiada token akses Google. Sila log masuk dengan Google.');
  }

  // format of resourceName is "people/c123456789"
  const res = await fetch(`${PEOPLE_API_BASE}/${resourceName}:deleteContact`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Gagal memadam kenalan dari Google Contacts.');
  }

  return true;
}
