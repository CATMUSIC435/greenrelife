import { Heart, MapPin, Star } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function ServiceCard() {
  return (
    <Card className="w-full gap-2 overflow-hidden rounded-2xl py-0 shadow-md transition-all duration-300 hover:shadow-lg md:gap-4">
      {/* Image */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxZWFyY2h8M3x8b3JnYW5pYyUyMGdhcmRlbmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=80"
          alt="Service"
          className="h-52 w-full object-cover"
        />
        <button className="absolute top-3 right-3 rounded-full bg-white p-2 shadow-sm transition hover:scale-110">
          <Heart className="h-4 w-4 text-red-500" />
        </button>
      </div>

      {/* Content */}
      <CardContent className="px-4 py-4">
        {/* Tag + Location */}
        <div className="mb-3 flex items-center justify-between">
          <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100">
            Cleaning
          </Badge>

          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="mr-1 h-4 w-4 text-gray-400" />
            North Hills
          </div>
        </div>

        <h3 className="mb-1 text-lg font-semibold">
          Deep Eco-Friendly Cleaning
        </h3>

        <p className="mb-4 line-clamp-2 text-sm text-gray-500">
          Thorough home cleaning services. Comprehensive deep cleaning:
          dusting, sanitizing, and eco-based products for a safer home.
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="David" />
            </Avatar>
            <p className="text-sm font-medium">David Rodriguez</p>
          </div>

          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">4.9</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
