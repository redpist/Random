// Made By Redpist
// Thx to Peluche, Bombela and C++11

// usage : cat dictionary | ./alphasort_and_anagrams
// dictionay must be in ASCII or ISO 8859-X, sry

#include <unordered_map>
#include <vector>
#include <set>
#include <string>
#include <cstring>
#include <iostream>

// #define PRINT_SORTED_DICTIONARY

const std::vector<long int> primesNumber = {
    2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,
    127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,
    283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,
    467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,
    661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,
    877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997,1009,1013,1019,1021,1031,1033,1039,1049,1051,1061,1063,1069,
    1087,1091,1093,1097,1103,1109,1117,1123,1129,1151,1153,1163,1171,1181,1187,1193,1201,1213,1217,1223,1229,1231,1237,1249,1259,1277,1279,1283,1289,1291,
    1297,1301,1303,1307,1319,1321,1327,1361,1367,1373,1381,1399,1409,1423,1427,1429,1433,1439,1447,1451,1453,1459,1471,1481,1483,1487,1489,1493,1499,1511,
    1523,1531,1543,1549,1553,1559,1567,1571,1579,1583,1597,1601,1607,1609,1613,1619
  };

double hash(const std::string &str)
{
  double n = 1;
  for (unsigned char c: str)
    n *= primesNumber[c];
  return n;
}

struct    AlphaCompare
{
  bool operator() (const std::pair<double, std::string> &a, const std::pair<double, std::string> &b)
  {
    return strcmp(a.second.c_str(), b.second.c_str()) <= 0;
  }
};

int main(int argc, char *argv[])
{
  std::string                                 buff;
  std::unordered_multimap<double, const std::string&>   anagramsDico;
  std::set<std::pair<double, std::string>, AlphaCompare>           dico;

  while (!std::cin.eof())
    {
      getline(std::cin, buff);
      auto pair = dico.insert(std::pair<double, const std::string>(hash(buff), buff));
      if (pair.second)
        anagramsDico.insert(std::pair<double, const std::string&>(pair.first->first, pair.first->second));
    }
  #ifdef PRINT_SORTED_DICTIONARY
  for (auto word: dico)
    {
      std::cout << word.second << "";
      if (anagramsDico.count(word.first) > 1)
        {
          std::cout << " - anagrams : [";
          auto range = anagramsDico.equal_range(word.first);
          for (auto it = range.first ; it != range.second; ++it)
            {
              std::cout << it->second << ", ";
            }
          std::cout << "]";
        }
      std::cout << "\n";
    }
  #endif
  return 0;
}
