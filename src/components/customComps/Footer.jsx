"use client";
import { footer } from "@hooks/footerConst";
import { getOwner } from "@lib/sanityActions";
import { Briefcase, Facebook, Github, Mail, User, Youtube } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";

const Footer = () => {
  const [owner, setOwner] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchOwner = async () => {
      try {
        setLoading(true);
        const data = await getOwner();
        if (data === null || data === undefined) {
        }
        setOwner(data);
      } catch (error) {
        console.error("Error fetching owner:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOwner();

    return () => {
      // Cancel the ongoing network request
      abortController.abort();
    };
  }, []);

  return (
    <div className="flex text-gray-500 flex-col md:flex-row justify-between gap-50 px-10 py-2 space-y-5">
      <div className="md:w-2/5 w-full">
        {owner?.map((item, i) => (
          <ul className="space-y-3  " key={i}>
            <li className="flex items-center whitespace-nowrap">
              <User className="text-primary mr-2" /> {item.name}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <Briefcase className="text-primary mr-2" /> {item.work}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <Mail className="text-primary mr-2" /> {item.email}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <Facebook className="text-primary mr-2" /> Facebook
            </li>
            <li className="flex items-center whitespace-nowrap">
              <Github className="text-primary mr-2" />
              GitHub
            </li>
            <li className="flex items-center whitespace-nowrap">
              <Youtube className="text-primary mr-2" /> Youtube
            </li>
          </ul>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between w-3/4">
        {footer.map((item, i) => (
          <div key={i} className="flex flex-col">
            <p className="font-medium text-primary text-lg capitalize">
              {item.name}
            </p>
            <ul>
              {item.links.map((item, i) => (
                <li key={i} className="cursor-pointer">
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Footer;
