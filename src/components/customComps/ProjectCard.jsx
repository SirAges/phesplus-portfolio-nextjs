import Image from "next/image";
import { urlForImage } from "../../../sanity/lib/image";
import { formatDate } from "@lib/formatDate";
import Link from "next/link";

const ProjectCard = ({ project }) => {
  return (
    <div className="flex flex-col items-start space-y-1 border border-muted rounded-md p-2">
      <Link
        href={`/dashboard/projects/${project._id}`}
        className="text-primary font-medium capitalize"
      >
        {project.title}
      </Link>
      <p className="text-gray-400 w-full truncate whitespace-nowrap">
        {project.description}
      </p>

      <Link
        style={{ minHeight: "24rem" }}
        href={`/dashboard/projects/${project._id}`}
        className="relative  min-w-full"
      >
        <Image
          fill
          referrerPolicy="no-referrer"
          className=" rounded-md object-cover  object-center"
          src={urlForImage(project?.images[0]?.asset?.url)}
          alt={project.title}
        />
      </Link>
      <div className="flex w-full justify-between items-center">
        <p className="text-gray-600 font-medium capitalize">
          {project.category}
        </p>
        <p className="text-gray-400 text-sm">
          {formatDate(project._createdAt)}.
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
