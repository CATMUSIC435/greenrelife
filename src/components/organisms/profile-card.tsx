import { Globe, Mail, MapPin } from 'lucide-react'; // Example icons from lucide-react
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Define the type for the user profile props
type UserProfileProps = {
  name: string;
  title: string;
  location: string;
  email: string;
  website: string;
  bio: string;
  imageUrl: string;
};

const ProfileCard: React.FC<UserProfileProps> = ({
  name,
  title,
  location,
  email,
  website,
  bio,
  imageUrl,
}) => {
  return (
    <div className="mx-auto my-10 max-w-md overflow-hidden rounded-lg bg-white shadow-xl md:max-w-2xl">
      <div className="md:flex">
        {/* Profile Image Section */}
        <div className="md:flex-shrink-0">
          <Image
            className="h-48 w-full object-cover md:w-48"
            src={imageUrl}
            alt={`Profile picture of ${name}`}
          />
        </div>
        {/* Profile Information Section */}
        <div className="p-8">
          <div className="text-sm font-semibold tracking-wide text-indigo-600 uppercase">
            {title}
          </div>
          <Link
            href="#"
            className="mt-1 block text-lg leading-tight font-medium text-black hover:underline"
          >
            {name}
          </Link>
          <p className="mt-2 text-gray-500">{bio}</p>

          {/* Details and Links */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-gray-600">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Mail className="mr-2 h-4 w-4" />
              <a href={`mailto:${email}`} className="hover:text-indigo-600">
                {email}
              </a>
            </div>
            <div className="flex items-center text-gray-600">
              <Globe className="mr-2 h-4 w-4" />
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600"
              >
                {website.replace(/https?:\/\//, '')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
